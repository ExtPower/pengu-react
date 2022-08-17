import React from "react";
import DiscordIcon from "../../assets/discordIcon.png";
import DiscordBackground from "../../assets/discordBackground.webp";
import "./login.css";
export default function Login() {
  return (
    <div>
      <section>
        <img src={DiscordBackground}></img>
        <form>
          <img src={DiscordIcon} className="discord_icon" alt="" />
          <h3>Welcome to Penguplatform!</h3>
          <p>Login with discord</p>
          <a href="http://localhost:3001/auth/discord" target="_blank">
            Login
          </a>
        </form>
      </section>
    </div>
  );
}
