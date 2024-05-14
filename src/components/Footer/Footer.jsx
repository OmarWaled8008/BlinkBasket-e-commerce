import React from "react";
import footerCSS from "./footer.module.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="container-fluid">
        <div className={footerCSS.footer_con}>
          <div className={footerCSS.footer_con__content}>
            <div className={footerCSS.footer_con__tittle}>
              <h4>BlinkBasket</h4>
              <p>prosucts Platform for clothes and fresh food.</p>
            </div>
            <ul className={footerCSS.footer_con__ul}>
              <li>
                <Link to="roadmaps">Find products</Link>
              </li>
              <li>
                <Link to="aboutus">About Us</Link>
              </li>
              <li>
                <Link>Contact Us</Link>
              </li>
            </ul>
            <div className={footerCSS.footer_con__email}>
              <p>Email Us As</p>
              <p>BlinkBasket@gmail.com</p>
            </div>
            <div className={footerCSS.footer_con__social}>
              <p>you can follow us in :</p>
              <ul>
                <li>
                  <a href="">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className={footerCSS.footer_con__rights}>
            2023 BlinkBasket. all right reserved
          </p>
        </div>
      </footer>
    </>
  );
}
