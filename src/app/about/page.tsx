export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Kasper Transportation</h1>

      {/* CEO */}
      <div className="mb-10">
        <div className="bg-gray-100 text-gray rounded-lg p-6 shadow-lg text-center max-w-sm mx-auto hadow-md w-60 text-center hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-semibold">Kasper</h2>
          <p className="mt-1 text-gray-600">CEO</p>
        </div>
      </div>

      {/* Admin */}
      <div className="mb-10">
        <div className="bg-gray-100 text-gray rounded-lg p-5 shadow-md text-center max-w-sm mx-auto hadow-md w-60 text-center hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold">Tim</h3>
          <p className="mt-1 text-gray-600">Admin</p>
        </div>
      </div>

      {/* Software Engineers */}
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { name: 'Gurpreet', role: 'Fullstack Software Engineer' },
          { name: 'Keval', role: 'Fullstack Software Engineer' },
          { name: 'Farid', role: 'Fullstack Software Engineer' },
        ].map(({ name, role }) => (
          <div
            key={name}
            className="bg-gray-100 rounded-lg p-5 shadow-md w-60 text-center hover:shadow-xl transition-shadow"
          >
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="mt-1 text-gray-600">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
