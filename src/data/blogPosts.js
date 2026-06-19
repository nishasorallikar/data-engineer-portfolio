export const blogPosts = [
    {
        id: 'intro-to-data-types',
        title: 'Python Essentials: Intro to Data Types',
        category: 'python',
        image: '/blog-hero.png',
        date: 'June 2026',
        readTime: '5 min read',
        excerpt: 'A foundational guide to understanding data types in Python. Learn how Python dynamically assigns types and how to work with primitives and collections.',
        tags: ['Python', 'Basics', 'Data Types'],
        content: `
## Why Data Types Matter

In Python, every value has a data type. The data type determines what kind of operations you can perform on that value. Because Python is dynamically typed, it automatically detects the data type of a variable when you assign a value to it.

For example, if you have a string variable, you can use string methods like \`.upper()\` or \`.lower()\`. But if you try to use those same methods on a numeric variable (like an integer), Python will throw an error!

## Categories of Data Types

Python's basic data types can be grouped into three main categories:

### 1. No Value
- **NoneType:** Represented by the keyword \`None\`. It is used to explicitly indicate that a variable has no value assigned to it.

### 2. Single Value (Primitive Types)
These are the fundamental building blocks of data in Python:
- **Integer (\`int\`):** Whole numbers without a decimal point. Example: \`age = 25\`
- **Float (\`float\`):** Numbers with a decimal point. Example: \`height = 5.9\`
- **String (\`str\`):** Text data enclosed in quotes. Example: \`name = "Alice"\`
- **Boolean (\`bool\`):** Represents truth values. It can only be \`True\` or \`False\`. Example: \`is_student = True\`

### 3. Multi-Values (Collections)
These are container types used to group multiple values together. While we'll dive deeper into these later, the main ones include:
- **Lists:** Ordered, mutable sequences.
- **Tuples:** Ordered, immutable sequences.
- **Sets:** Unordered collections of unique items.
- **Dictionaries:** Key-value pairs for mapping data.

## Examples in Action

Here is how you might initialize these different data types in a Python script:

\`\`\`python
# Assigning different data types
user_age = 28               # int
user_height = 6.1           # float
user_name = "Data Engineer" # str
is_active = True            # bool
user_location = None        # NoneType
\`\`\`

## Practice Challenge

Try it yourself! Create variables to store your own details:
1. Your age (integer)
2. Your height (decimal float)
3. Your name (string)
4. Whether you are currently a student (boolean)
5. An unassigned or empty value (None)

Once you've created them, use the \`print()\` and \`type()\` functions to output the value and the data type for each of your variables.
        `
    },
    {
        id: 'optimized-star-schema',
        title: 'Optimized Star Schema for BI',
        category: 'database',
        date: 'May 2026',
        readTime: '8 min read',
        excerpt: 'Designing a high-performance star schema in PostgreSQL to support rapid Power BI dashboard queries.',
        tags: ['SQL', 'Data Modeling', 'PostgreSQL'],
        content: `
## The SLA Nightmare

Last quarter, our primary Power BI dashboard was taking almost 45 seconds to refresh when users filtered by date ranges. The underlying data warehouse was a massive, highly normalized PostgreSQL database. The BI team was writing complex DAX queries just to join 12 different tables together to get a simple sales aggregate.

This is a classic trap: **OLTP (Online Transaction Processing) schemas are not designed for OLAP (Online Analytical Processing) workloads.** 

## The Solution: Dimensional Modeling

To solve this, we needed to denormalize the data into a **Star Schema**. By pre-joining and flattening the data into central Fact tables surrounded by Dimension tables, we shift the compute burden from the BI tool to the nightly ETL pipeline.

### 1. Designing the Fact Table

The core of our business process was a "Sale". We created a \`fact_sales\` table that only contained foreign keys and numeric measures.

\`\`\`sql
CREATE TABLE fact_sales (
    sale_id BIGINT PRIMARY KEY,
    date_key INT NOT NULL,      -- Foreign key to dim_date
    product_key INT NOT NULL,   -- Foreign key to dim_product
    store_key INT NOT NULL,     -- Foreign key to dim_store
    customer_key INT NOT NULL,  -- Foreign key to dim_customer
    quantity INT,
    total_amount DECIMAL(10, 2),
    discount_amount DECIMAL(10, 2)
);

-- Optimize for analytical queries
CREATE INDEX idx_fact_date ON fact_sales(date_key);
CREATE INDEX idx_fact_store ON fact_sales(store_key);
\`\`\`

### 2. Creating the Date Dimension

The secret weapon of any Star Schema is a robust Date Dimension. Instead of calculating things like "Is Weekend?" or "Quarter" on the fly, we pre-calculate them.

\`\`\`sql
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY, -- e.g., 20260514
    full_date DATE NOT NULL,
    day_of_week INT,
    day_name VARCHAR(10),
    is_weekend BOOLEAN,
    month_name VARCHAR(10),
    quarter INT,
    year INT
);
\`\`\`

## The Impact

By migrating the BI tool to query the Star Schema instead of the raw normalized tables:
1. **Query Times:** Dropped from 45 seconds to < 2 seconds.
2. **DAX Complexity:** The BI team deleted hundreds of lines of complex DAX because the relationships were simply 1-to-many.
3. **ETL Scalability:** Our nightly dbt pipeline handled the transformations in under 10 minutes.

**Takeaway:** Stop making your BI tools do heavy joins. Pre-compute and denormalize into dimensional models!
`
    },
    {
        id: 'azure-databricks-lakehouse',
        title: 'Azure Databricks Lakehouse',
        category: 'cloud',
        date: 'April 2026',
        readTime: '12 min read',
        excerpt: 'Implementing a Medallion Architecture on Azure Databricks with Delta Lake for streaming and batch data.',
        tags: ['Azure', 'Databricks', 'PySpark'],
        content: `
## The Need for a Lakehouse

When managing terabytes of streaming IoT data alongside nightly batch dumps from our ERP system, a traditional data warehouse becomes astronomically expensive. We needed the cost-effectiveness of a Data Lake (Azure Data Lake Storage Gen2) with the reliability and ACID transactions of a Data Warehouse. 

Enter the **Databricks Lakehouse** architecture using Delta Lake.

## The Medallion Architecture

We implemented the standard Medallion pattern: **Bronze -> Silver -> Gold**. 

### 1. The Bronze Layer (Raw Data)
The Bronze layer is an exact replica of the source systems. We use Auto Loader in Databricks to incrementally ingest JSON files as they arrive in ADLS Gen2.

\`\`\`python
# Ingesting streaming JSON data into Bronze using Auto Loader
df_bronze = (spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/checkpoints/bronze_schema")
    .load("abfss://raw@myadls.dfs.core.windows.net/iot_events/")
)

(df_bronze.writeStream
    .format("delta")
    .option("checkpointLocation", "/checkpoints/bronze_write")
    .trigger(availableNow=True) # Run as an incremental batch
    .table("lakehouse.bronze.iot_events")
)
\`\`\`

### 2. The Silver Layer (Cleansed & Conformed)
In the Silver layer, we clean the data, enforce schemas, and deduplicate records. This is the single source of truth for Data Scientists.

\`\`\`python
from pyspark.sql.functions import col, current_timestamp

# Cleanse and enrich
df_silver = (spark.read.table("lakehouse.bronze.iot_events")
    .dropDuplicates(["event_id"])
    .filter(col("temperature").isNotNull())
    .withColumn("ingestion_timestamp", current_timestamp())
)

# Merge (Upsert) into Silver Delta Table
df_silver.createOrReplaceTempView("updates")

spark.sql("""
    MERGE INTO lakehouse.silver.iot_events AS target
    USING updates AS source
    ON target.event_id = source.event_id
    WHEN MATCHED THEN UPDATE SET *
    WHEN NOT MATCHED THEN INSERT *
""")
\`\`\`

### 3. The Gold Layer (Business Aggregates)
Finally, we create highly refined, aggregated views for the BI analysts. This layer is optimized for fast reads.

\`\`\`sql
-- Creating an aggregated view for daily reporting
CREATE OR REPLACE TABLE lakehouse.gold.daily_device_stats
AS
SELECT 
    device_id,
    DATE(event_timestamp) as event_date,
    AVG(temperature) as avg_temp,
    MAX(temperature) as max_temp
FROM lakehouse.silver.iot_events
GROUP BY device_id, DATE(event_timestamp);
\`\`\`

## Why This Rocks

By using Delta Lake, we gained **Time Travel** (we can query older versions of the data if something breaks) and **Schema Enforcement** (preventing bad data from entering the Silver layer). The pipeline runs robustly and at a fraction of the cost of a dedicated warehouse!
`
    }
];
