import { DataSource } from "typeorm";

export const config  = new DataSource(
    {
        type: "sqlite",
        database: "database.sqlite",
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: true,
        migrations: [__dirname, `/*.ts`],
        migrationsTableName: "e-commerce",

    }
)

config.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
