try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ModuleNotFoundError:
    print("pymysql module not found. Please install it using 'pip install pymysql'.")
