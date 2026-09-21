import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";

const router = express.Router();

const writeOffUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 40,
  },

  fileFilter: (req, file, cb) => {
    if (String(file.mimetype || "").startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed."));
  },
});


const escapeWriteOffHtml = (value = "") =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// ======================================================
// WRITE-OFF EMAIL
// ======================================================

router.post(
  "/send",
  writeOffUpload.array("images", 40),
  async (req, res) => {
    try {
      let sheets = [];

      try {
        sheets = JSON.parse(req.body.sheets || "[]");
      } catch (error) {
        return res.status(400).json({
          message: "Invalid write-off sheet data.",
        });
      }


      if (!Array.isArray(sheets) || sheets.length === 0) {
        return res.status(400).json({
          message: "At least one write-off sheet is required.",
        });
      }


      const uploadedImages = Array.isArray(req.files)
        ? req.files
        : [];


      const attachments = [];


      const sheetsHtml = sheets
        .map((sheet, sheetIndex) => {
          const imageIndexes = Array.isArray(
            sheet.imageIndexes
          )
            ? sheet.imageIndexes
            : [];


          const sheetImages = imageIndexes
            .map((imageIndex, imagePosition) => {
              const file =
                uploadedImages[
                  Number(imageIndex)
                ];

              if (!file) {
                return "";
              }


              const cid = `writeoff-sheet-${sheetIndex}-image-${imagePosition}@inventory`;


              attachments.push({
                filename:
                  file.originalname ||
                  `damage-${sheetIndex + 1}-${
                    imagePosition + 1
                  }.jpg`,

                content: file.buffer,

                contentType:
                  file.mimetype ||
                  "image/jpeg",

                cid,
              });


              return `
                <div
                  style="
                    display:inline-block;
                    width:150px;
                    margin:0 10px 10px 0;
                    vertical-align:top;
                  "
                >
                  <img
                    src="cid:${cid}"
                    alt="Damage picture"
                    style="
                      display:block;
                      width:150px;
                      height:150px;
                      object-fit:cover;
                      border-radius:10px;
                      border:1px solid #d1d5db;
                    "
                  />
                </div>
              `;
            })
            .join("");


          return `
            <div
              style="
                margin:0 0 32px 0;
                padding:20px;
                border:1px solid #d1d5db;
                border-radius:12px;
                background:#ffffff;
              "
            >

              <div
                style="
                  margin-bottom:16px;
                  padding-bottom:10px;
                  border-bottom:2px solid #dc2626;
                "
              >
                <div
                  style="
                    color:#dc2626;
                    font-size:12px;
                    font-weight:800;
                    text-transform:uppercase;
                    letter-spacing:1px;
                  "
                >
                  Inventory Damage
                </div>

                <div
                  style="
                    margin-top:4px;
                    color:#111827;
                    font-size:20px;
                    font-weight:800;
                  "
                >
                  Worthless Write-Off Sheet ${
                    sheetIndex + 1
                  }
                </div>
              </div>


              <table
                cellpadding="8"
                cellspacing="0"
                style="
                  width:100%;
                  border-collapse:collapse;
                  color:#111827;
                  font-family:Arial,sans-serif;
                  font-size:14px;
                "
              >

                <tr>
                  <td
                    style="
                      width:180px;
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Item
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.item
                    )}
                  </td>
                </tr>



<tr>
  <td
    style="
      border:1px solid #d1d5db;
      background:#f3f4f6;
      font-weight:700;
    "
  >
    Description
  </td>

  <td style="border:1px solid #d1d5db;">
    ${escapeWriteOffHtml(
      sheet.description
    )}
  </td>
</tr>



                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    UOM
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.uom
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Lot / PO #
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.lotPoNumber
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Product Code
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.productCode
                    )}
                  </td>
                </tr>


           


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Qty
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.qty
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Explanation
                  </td>

                  <td
                    style="
                      border:1px solid #d1d5db;
                      white-space:pre-wrap;
                    "
                  >
                    ${escapeWriteOffHtml(
                      sheet.explanation
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Adjusted By
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.adjustedBy
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Journal #
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.journalNumber
                    )}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      border:1px solid #d1d5db;
                      background:#f3f4f6;
                      font-weight:700;
                    "
                  >
                    Date
                  </td>

                  <td style="border:1px solid #d1d5db;">
                    ${escapeWriteOffHtml(
                      sheet.date
                    )}
                  </td>
                </tr>

              </table>


              ${
                sheetImages
                  ? `
                    <div style="margin-top:20px;">

                      <div
                        style="
                          margin-bottom:10px;
                          font-size:13px;
                          font-weight:800;
                          color:#374151;
                          text-transform:uppercase;
                        "
                      >
                        Damage Pictures
                      </div>

                      <div>
                        ${sheetImages}
                      </div>

                    </div>
                  `
                  : ""
              }

            </div>
          `;
        })
        .join("");


      const transporter =
        nodemailer.createTransport({
          service: "gmail",

          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });


      await transporter.sendMail({
        from: process.env.EMAIL_USER,

to: req.body.email?.trim(),
        subject:
          sheets.length === 1
            ? "Inventory Damage / Worthless Write-Off Sheet"
            : `Inventory Damage / ${sheets.length} Worthless Write-Off Sheets`,

        html: `
          <!DOCTYPE html>

          <html>
            <body
              style="
                margin:0;
                padding:24px;
                background:#f3f4f6;
                font-family:Arial,sans-serif;
              "
            >

              <div
                style="
                  max-width:900px;
                  margin:0 auto;
                "
              >

                <div style="margin-bottom:20px;">

                  <h1
                    style="
                      margin:0;
                      color:#111827;
                      font-size:24px;
                    "
                  >
                    Inventory Damage
                  </h1>

                  <p
                    style="
                      margin:6px 0 0 0;
                      color:#6b7280;
                      font-size:14px;
                    "
                  >
                    ${sheets.length}
                    write-off sheet${
                      sheets.length === 1
                        ? ""
                        : "s"
                    } submitted together.
                  </p>

                </div>


                ${sheetsHtml}

              </div>

            </body>
          </html>
        `,

        attachments,
      });


      res.status(200).json({
        message: `${sheets.length} write-off sheet${
          sheets.length === 1 ? "" : "s"
        } sent successfully.`,
      });

    } catch (error) {
      console.error(
        "WRITE-OFF EMAIL ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Could not send write-off sheets.",
      });
    }
  }
);



// ======================================================
// LOW STOCK / OUT OF STOCK EMAIL LIST
// ======================================================

router.post("/inventory-list", async (req, res) => {
  try {
    const {
      email,
      title,
      html,
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email address is required.",
      });
    }

    if (!html) {
      return res.status(400).json({
        message: "Inventory list is empty.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      // User chooses who receives the list
      to: email.trim(),

      subject:
        title === "LOW STOCK"
          ? "Low Stock Inventory List"
          : "Out of Stock Inventory List",

      // Same list HTML created by your Dashboard
      html,
    });

    res.status(200).json({
      message: "Inventory list sent successfully.",
    });
  } catch (error) {
    console.error(
      "INVENTORY LIST EMAIL ERROR:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Could not send inventory list.",
    });
  }
});


export default router;
