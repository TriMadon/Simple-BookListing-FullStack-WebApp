import time
import pandas as pd
from pymongo import MongoClient
from sqlalchemy import create_engine

sqlEngine = create_engine("mysql+pymysql://dbuser:password@book-db:3306/bookuser")
mongoEngine = MongoClient("mongodb://admin:password@analyzed-books-db:27017/?authMechanism=DEFAULT")
mongodb = mongoEngine['analyzed-books']
collection = mongodb['books']


def returnAnAnalyzedTable(original_table):
    newTable = original_table.groupby('bookTitle').agg({'rating': 'mean', 'totalReads': 'sum'}).reset_index(level=0)
    return newTable.rename(columns={"rating": "meanRating", "totalReads": "sumOfReads"})


def main():
    while True:
        table_df = pd.read_sql_table(
            "Saves",
            con=sqlEngine,
            coerce_float=True,
            columns=['bookTitle', 'rating', 'totalReads']
        )

        analyzed_table = returnAnAnalyzedTable(table_df)
        documents = analyzed_table.to_dict('records')

        for document in collection.find({}):
            if (document.get('bookTitle')) not in table_df['bookTitle'].values:
                collection.delete_one(document)

        for document in documents:
            collection.replace_one({'bookTitle': document['bookTitle']}
                                   , document, upsert=True)

        time.sleep(5)


if __name__ == '__main__':
    main()
