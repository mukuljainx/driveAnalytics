# DB Commands

`SHOW DATABASES` - List of db's

`USE <db_name>` - Selects a db

`SHOW SERIES>` - List all available series

`select * from <series_name> ` - All values from a Series

`curl -i -XPOST 'http://localhost:8086/write?db=express_response_db' --data-binary @data.txt` - For logging data from file
