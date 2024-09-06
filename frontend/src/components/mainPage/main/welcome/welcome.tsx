import style from "./welcome.module.scss";

function Welcome() {
  return (
    <div className={style["welcome"]}>
      <h1>Images Gallery</h1>
      <p>
        This is a simple application that retrieves photos using Unsplish API.
        In order to start enter any search tern in the input field.
      </p>
      <p>
        <a href="https://unsplash.com" target="_blank">
          <button>Unsplash</button>
        </a>
      </p>
    </div>
  );
}

export default Welcome;
