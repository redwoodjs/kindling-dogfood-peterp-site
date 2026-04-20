const projects = [
  {
    href: "https://redwoodjs.com",
    title: "RedwoodJS",
    description: "Bringing full-stack to the JAMstack",
  },
  {
    href: "https://machinen.dev",
    title: "Machinen",
    description: "Coming soon...",
  },
  {
    href: "https://github.com/peterp/Blackspace",
    title: "Blackspace",
    description: "Add blank spaces to your macOS Dock",
  },
  {
    href: "http://billable.me",
    title: "Billable",
    description: "Billing Made Simple. Period.",
  },
] as const;

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
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.href}>
              <i>{project.title}</i>
            </a>{" "}
            &dash; {project.description}
          </li>
        ))}
      </ol>
    </>
  );
}
