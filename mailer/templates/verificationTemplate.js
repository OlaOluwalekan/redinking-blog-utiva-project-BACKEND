const verificationTemplate = (code) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RedInking | Verification</title>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }
      body {
        background-color: aliceblue;
      }
      .main {
        width: 100%;
        max-width: 608px;
        background-color: white;
      }
      .message {
        display: none;
      }
    </style>

    <script
      src="https://kit.fontawesome.com/02f4706bc0.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <center>
      <table class="main">
        <!-- STRIP 1-->
        <tr>
          <td width="100%" height="6" style="background-color: #e63264"></td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td>
            <table style="width: 100%; text-align: center">
              <tr>
                <td
                  style="
                    display: inline-block;
                    width: 50%;
                    max-width: 300px;
                    /* background-color: yellow; */
                  "
                >
                  <h2 style="color: #e63264">
                    Red<span style="color: #6446ff">Inking</span>
                  </h2>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- STRIP 2-->
        <tr>
          <td width="100%" height="6" style="background-color: #e63264"></td>
        </tr>

        <!-- IMAGE -->
        <tr>
          <td style="text-align: center">
            <table style="width: 60%; text-align: center; margin: 20px auto">
              <tr>
                <td>
                  <img
                    src="https://i.ibb.co/mG65DT8/verification-removebg-preview.png"
                    alt="Verify"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <span
                    style="
                      font-size: 30px;
                      font-weight: 900;
                      margin-left: 20px;
                      text-align: left;
                      line-height: 30px;
                      color: #6446ff;
                    "
                    >It's time you get verified</span
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr style="width: 100%; text-align: center">
          <td>
            <div style="margin: 40px auto; width: 80%">
              <p>
                Hi! We are so glad you signed up with
                <span style="color: #e63264; font-weight: 600">
                  Red<span style="color: #6446ff">Inking</span></span
                >. The code below is sent to you so you can verify your email
                address and you are all setup
              </p>
              <h2
                class="code"
                style="
                  color: #6446ff;
                  background-color: #e632653a;
                  margin: 0 auto;
                  margin-top: 20px;
                  width: fit-content;
                  padding: 0 10px;
                  border-radius: 5px;
                  cursor: pointer;
                "
              >
                ${code}
              </h2>
              <p
                class="message"
                style="margin-bottom: 20px; font-size: 12px; color: gray"
              >
                <span><i class="fas fa-check"></i></span>
                code copied
              </p>
              <p>If you think this mas a mistake, please ignore this mail</p>
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td>
            <table
              style="
                width: 95%;
                background-color: aliceblue;
                margin: 10px auto;
                border-radius: 5px;
                text-align: center;
                padding: 30px 0;
              "
            >
              <tr>
                <td>
                  <h2 style="color: #e63264">
                    Red<span style="color: #6446ff; margin: 0 auto"
                      >Inking</span
                    >
                  </h2>
                </td>
              </tr>

              <tr>
                <td>
                  <table style="width: 100%; margin: 20px 0">
                    <tr>
                      <td style="width: 33%">
                        <a href="#" style="text-decoration: none; color: black"
                          >Home</a
                        >
                      </td>
                      <td style="width: 33%">
                        <a href="#" style="text-decoration: none; color: black"
                          >API</a
                        >
                      </td>
                      <td style="width: 33%">
                        <a href="#" style="text-decoration: none; color: black"
                          >Blog</a
                        >
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <p style="font-size: 12px; color: gray">connect with us</p>
                </td>
              </tr>

              <tr>
                <td>
                  <table style="width: 200px; margin: 20px auto">
                    <tr>
                      <td>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                      </td>
                      <td>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                      </td>
                      <td>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <p style="font-size: 14px">
                    &copy;
                    <span style="color: #e63264">
                      Red<span style="color: #6446ff">Inking</span>
                    </span>
                    2023, All Rights Reserved
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>

    <script>
      const codeDom = document.querySelector('.code')
      const messageDOM = document.querySelector('.message')

      codeDom.onclick = () => {
        const codeText = codeDom.textContent.trim()
        navigator.clipboard.writeText(codeText)
        messageDOM.style.display = 'block'
        setTimeout(() => {
          messageDOM.style.display = 'none'
        }, 2000)
      }
    </script>
  </body>
</html>

`

module.exports = verificationTemplate
