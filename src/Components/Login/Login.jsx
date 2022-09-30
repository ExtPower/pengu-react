import React from "react";
import DiscordIcon from "../../assets/discordIcon.png";
import DiscordBackground from "../../assets/discordBackground.webp";
import "./login.css";
export default function Login() {
  return (
    <div className="loginSection">
      <section>
        <img src={DiscordBackground}></img>
        <form>
          <img src={DiscordIcon} className="discord_icon" alt="" />
          <h3>Welcome to Penguplatform!</h3>
          <p>Login with discord</p>
          <a href="http://penguplatform.com/auth/discord">Login</a>
        </form>
      </section>
    </div>
  );
}
