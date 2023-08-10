import React, { useState, useEffect } from "react";

function Header() {
  return (
    <div className="header">
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/jakHeader.6348a4ba.svg"></img>
        <p>Jak</p>
      </div>
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/ratchetHeader.1867813b.svg"></img>
        <p>Ratchet</p>
      </div>
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/yunaHeader.ec29f948.svg"></img>
        <p>Yuna</p>
      </div>
    </div>
  );
}

export default Header;
