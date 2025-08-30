import { put } from "@vercel/blob";
import pool from "../db/pool.js";

export const uploadImage = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        // Upload to Vercel Blob
        const blob = await put(
            `test/${file.originalname}`,
            file.buffer,
            {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
                addRandomSuffix: true,
            }
        );

        const fileUrl = blob.url;

        // Insert URL into Neon PostgreSQL
        const result = await pool.query(
            "INSERT INTO imagessss(url) VALUES($1) RETURNING id, url",
            [fileUrl]
        );

        res.status(201).json({ success: true, data: result.rows[0] });

    } catch (error) {
        console.error(error);
        next(error);
    }
};
