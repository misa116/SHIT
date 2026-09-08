import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const {
      item,
      uom,
      lotPoNumber,
      productCode,
      description,
      qty,
      explanation,
      adjustedBy,
      journalNumber,
      date,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.WRITEOFF_TO_EMAIL,
      subject: "Inventory Damage / Worthless Write-Off Sheet",
      html: `
        <h2>Inventory Damage / Worthless Write-Off Sheet</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
          <tr><td><b>Item</b></td><td>${item || ""}</td></tr>
          <tr><td><b>UOM</b></td><td>${uom || ""}</td></tr>
          <tr><td><b>Lot / PO #</b></td><td>${lotPoNumber || ""}</td></tr>
          <tr><td><b>Product Code</b></td><td>${productCode || ""}</td></tr>
          <tr><td><b>Description</b></td><td>${description || ""}</td></tr>
          <tr><td><b>Qty</b></td><td>${qty || ""}</td></tr>
          <tr><td><b>Explanation</b></td><td>${explanation || ""}</td></tr>
          <tr><td><b>Adjusted By</b></td><td>${adjustedBy || ""}</td></tr>
          <tr><td><b>Journal #</b></td><td>${journalNumber || ""}</td></tr>
          <tr><td><b>Date</b></td><td>${date || ""}</td></tr>
        </table>
      `,
    });

    res.status(200).json({ message: "Write-off sheet sent successfully." });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Could not send write-off sheet.",
    });
  }
});

export default router;
