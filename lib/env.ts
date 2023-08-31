import zod from "zod"

const envSchema=zod.object({
    DATABASE_URL:zod.string().nonempty(),
    GOOGLE_CLIENT_ID:zod.string().nonempty(),
    GOOGLE_CLIENT_SECRET:zod.string().nonempty(),
    NEXTAUTH_URL:zod.string().nonempty(),
    NEXTAUTH_SECRET:zod.string().nonempty(),
})

export const env= envSchema.parse(process.env)

// he explained parse as allowing us to pass a value to the schema to validate it. so we pass the env variables in order to validate the strings.
// now if any of the strings is empty itll show us an error.