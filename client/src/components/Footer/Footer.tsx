import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="#">
            <img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" />
          </a>
          <a href="#">
            <img src="https://img.icons8.com/stickers/50/000000/instagram-new--v2.png" />
          </a>
          <a href="#">
            <img src="https://img.icons8.com/doodle/48/000000/youtube-play--v2.png" />
          </a>
          <a href="#">
            <img src="https://img.icons8.com/doodle/50/000000/tiktok--v2.png" />
          </a>
        </div>
        <ul className="">
          <li className="list-inline-item">
            <a href="#">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="#">About</a>
          </li>
        </ul>
        <p className="copyright">Company Name © 2018</p>
      </footer>
    </div>
  );
}
