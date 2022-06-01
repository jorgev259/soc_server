"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createForgor = createForgor;
exports.transporter = exports.template = exports.mailConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _generatePassword = _interopRequireDefault(require("generate-password"));

var _sequelize = require("sequelize");

var mailConfig = JSON.parse(process.env.MAIL);
exports.mailConfig = mailConfig;

var transporter = _nodemailer["default"].createTransport(mailConfig);

exports.transporter = transporter;

function createForgor(_x, _x2, _x3) {
  return _createForgor.apply(this, arguments);
}

function _createForgor() {
  _createForgor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user, db, transaction) {
    var key, row, html, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.models.forgor.destroy({
              where: {
                username: user.username
              },
              transaction: transaction
            });

          case 2:
            key = _generatePassword["default"].generate({
              length: 15,
              numbers: true,
              upercase: false,
              strict: true
            });
            _context.next = 5;
            return db.models.forgor.create({
              key: key,
              expires: (0, _sequelize.literal)('DATE_ADD(NOW(), INTERVAL 24 HOUR)')
            }, {
              transaction: transaction
            });

          case 5:
            row = _context.sent;
            row.setUser(user, {
              transaction: transaction
            });
            html = template.replaceAll('{{forgor_link}}', "https://sittingonclouds.net/forgor?key=".concat(key));
            message = {
              from: mailConfig.auth.user,
              to: user.email,
              subject: 'Password Reset',
              html: html
            };
            _context.next = 11;
            return transporter.sendMail(message);

          case 11:
            return _context.abrupt("return", row);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createForgor.apply(this, arguments);
}

var template = "<!DOCTYPE html>\n\n<html lang='en' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:v='urn:schemas-microsoft-com:vml'>\n\n<head>\n  <title></title>\n  <meta charset='utf-8' />\n  <meta content='width=device-width, initial-scale=1.0' name='viewport' />\n  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n  <!--[if !mso]><!-->\n  <link href='https://fonts.googleapis.com/css?family=Abril+Fatface' rel='stylesheet' type='text/css' />\n  <link href='https://fonts.googleapis.com/css?family=Alegreya' rel='stylesheet' type='text/css' />\n  <link href='https://fonts.googleapis.com/css?family=Arvo' rel='stylesheet' type='text/css' />\n  <link href='https://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css' />\n  <link href='https://fonts.googleapis.com/css?family=Cabin' rel='stylesheet' type='text/css' />\n  <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css' />\n  <!--<![endif]-->\n  <style>\n    * {\n      box-sizing: border-box;\n    }\n\n    html {\n      height: 100%;\n      background-color: #f5f5f5;\n    }\n\n    body {\n      margin: 0;\n      padding: 0;\n    }\n\n    th.column {\n      padding: 0\n    }\n\n    a[x-apple-data-detectors] {\n      color: inherit !important;\n      text-decoration: inherit !important;\n    }\n\n    #MessageViewBody a {\n      color: inherit;\n      text-decoration: none;\n    }\n\n    p {\n      line-height: inherit\n    }\n\n    @media (max-width:520px) {\n      .icons-inner {\n        text-align: center;\n      }\n\n      .icons-inner td {\n        margin: 0 auto;\n      }\n\n      .row-content {\n        width: 100% !important;\n      }\n\n      .image_block img.big {\n        width: auto !important;\n      }\n\n      .stack .column {\n        width: 100%;\n        display: block;\n      }\n    }\n  </style>\n</head>\n\n<body style='background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'>\n  <table border='0' cellpadding='0' cellspacing='0' class='nl-container' role='presentation'\n    style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;' width='100%'>\n    <tbody>\n      <tr>\n        <td>\n          <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3'\n            role='presentation'\n            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;' width='100%'>\n            <tbody>\n              <tr>\n                <td>\n                  <table align='center' border='0' cellpadding='0' cellspacing='0'\n                    class='row-content stack' role='presentation'\n                    style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000;'\n                    width='500'>\n                    <tbody>\n                      <tr>\n                        <th class='column'\n                          style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'\n                          width='100%'>\n                          <table border='0' cellpadding='0' cellspacing='0'\n                            class='image_block' role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'\n                            width='100%'>\n                            <tr>\n                              <td\n                                style='padding-bottom:5px;padding-left:5px;padding-right:5px;width:100%;'>\n                                <div align='center' style='line-height:10px'><img\n                                    alt='reset-password' src='https://sittingonclouds.net/img/assets/clouds.png'\n                                    style='display: block; height: auto; border: 0; width: 175px; max-width: 100%;'\n                                    title='reset-password' width='175' /></div>\n                              </td>\n                            </tr>\n                          </table>\n                          <table border='0' cellpadding='0' cellspacing='0'\n                            class='heading_block' role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'\n                            width='100%'>\n                            <tr>\n                              <td style='text-align:center;width:100%;'>\n                                <h1\n                                  style='margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;'>\n                                  <strong>Forgot your password?</strong></h1>\n                              </td>\n                            </tr>\n                          </table>\n                          <table border='0' cellpadding='10' cellspacing='0'\n                            class='text_block' role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'\n                            width='100%'>\n                            <tr>\n                              <td>\n                                <div style='font-family: Tahoma, Verdana, sans-serif'>\n                                  <div\n                                    style='font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;'>\n                                    <p\n                                      style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'>\n                                      <span style='font-size:14px;'><span\n                                          style=''>Not to worry, we got you!\n                                        </span><span style=''>Let\u2019s get you a\n                                          new password.</span></span></p>\n                                  </div>\n                                </div>\n                              </td>\n                            </tr>\n                          </table>\n                          <table border='0' cellpadding='15' cellspacing='0'\n                            class='button_block' role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'\n                            width='100%'>\n                            <tr>\n                              <td>\n                                <div align='center'>\n                                  <!--[if mso]><v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' href='{{forgor_link}}' style='height:58px;width:272px;v-text-anchor:middle;' arcsize='35%' strokeweight='0.75pt' strokecolor='#FFC727' fillcolor='#e38e36'><w:anchorlock/><v:textbox inset='0px,0px,0px,0px'><center style='color:#393d47; font-family:Tahoma, Verdana, sans-serif; font-size:18px'><![endif]--><a\n                                    href='{{forgor_link}}'\n                                    style='text-decoration:none;display:inline-block;color:#393d47;background-color:#ff7b24;border-radius:20px;width:auto;padding-top:10px;padding-bottom:10px;font-family:Tahoma, Verdana, Segoe, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;'\n                                    target='_blank'><span\n                                      style='padding-left:50px;padding-right:50px;font-size:18px;display:inline-block;letter-spacing:normal;'><span\n                                        style='font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;'><span\n                                          data-mce-style='font-size: 18px; line-height: 36px;'\n                                          style='font-size: 18px; line-height: 36px;'><strong>RESET\n                                            PASSWORD</strong></span></span></span></a>\n                                  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->\n                                </div>\n                              </td>\n                            </tr>\n                          </table>\n                          <table border='0' cellpadding='0' cellspacing='0' class='text_block'\n                            role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'\n                            width='100%'>\n                            <tr>\n                              <td\n                                style='padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;'>\n                                <div style='font-family: Tahoma, Verdana, sans-serif'>\n                                  <div\n                                    style='font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;'>\n                                    <p\n                                      style='margin: 0; mso-line-height-alt: 19.5px;'>\n                                      <span style='font-size:13px;'>If you didn\u2019t\n                                        request to change your password, simply\n                                        ignore this email.</span></p>\n                                  </div>\n                                </div>\n                              </td>\n                            </tr>\n                          </table>\n                        </th>\n                      </tr>\n                    </tbody>\n                  </table>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-5'\n            role='presentation'\n            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;' width='100%'>\n            <tbody>\n              <tr>\n                <td>\n                  <table align='center' border='0' cellpadding='0' cellspacing='0'\n                    class='row-content stack' role='presentation'\n                    style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;'\n                    width='500'>\n                    <tbody>\n                      <tr>\n                        <th class='column'\n                          style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'\n                          width='100%'>\n                          <table border='0' cellpadding='15' cellspacing='0'\n                            class='text_block' role='presentation'\n                            style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'\n                            width='100%'>\n                            <tr>\n                              <td>\n                                <div style='font-family: Tahoma, Verdana, sans-serif'>\n                                  <div\n                                    style='font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;'>\n                                    <p\n                                      style='margin: 0; font-size: 14px; text-align: center;'>\n                                      <span style='font-size:10px;'>This link will\n                                        expire in 24 hours</span></p>\n                                  </div>\n                                </div>\n                              </td>\n                            </tr>\n                          </table>\n                        </th>\n                      </tr>\n                    </tbody>\n                  </table>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </td>\n      </tr>\n    </tbody>\n  </table><!-- End -->\n</body>\n\n</html>";
exports.template = template;