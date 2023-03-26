FROM python:3.7.14-slim
ADD main.py .
RUN	pip install pandas pymongo sqlalchemy pymysql cryptography
CMD ["python", "./main.py"]