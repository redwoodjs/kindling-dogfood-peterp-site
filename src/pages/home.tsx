export function HomePage() {
  return (
    <>
      <h1>Hi, my name is Peter.</h1>

      <p>
        I'm a South African living in Berlin. I love programming and it tends
        to take all of my time, so I try to balance my life with friendship,
        cycling, hiking and woodwork.
      </p>

      <p>
        You can follow me on{" "}
        <a href="https://twitter.com/appfactory/">Twitter</a>, or see my code
        on <a href="https://github.com/peterp/">GitHub</a>.
      </p>

      <h2>Side Projects</h2>
      <ol>
        <li>
          <a href="https://redwoodjs.com">
            <i>RedwoodJS</i>
          </a>{" "}
          &dash; Bringing full-stack to the JAMstack
        </li>
        <li>
          <i>Machinen</i> &dash; Coming soon...
        </li>
        <li>
          <a href="https://github.com/peterp/Blackspace">
            <i>Blackspace</i>
          </a>{" "}
          &dash; Add blank spaces to your macOS Dock
        </li>
        <li>
          <a href="http://billable.me">
            <i>Billable</i>
          </a>{" "}
          &dash; Billing Made Simple. Period.
        </li>
      </ol>
    </>
  );
}
