import express from "express";
const router = express.Router();

router.get("/", (request, response) => {
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

export default router;
