export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-semibold text-foreground">
          About Chirp
        </h1>

        <p className="mb-6 text-muted-foreground">
          Chirp is a simple social networking service (SNS) focused on sharing
          short messages and staying connected with others in a clean,
          minimal interface.
        </p>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-medium text-foreground">
            Built With
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>React for the frontend</li>
            <li>Express.js for the backend API</li>
            <li>PostgreSQL for data storage</li>
            <li>Amazon S3 for media and asset storage</li>
          </ul>
        </div>

        <div className="border-t pt-4 text-sm text-muted-foreground">
          Created by <span className="font-medium text-foreground">Suhas</span>
        </div>
      </div>
    </div>
  );
}
