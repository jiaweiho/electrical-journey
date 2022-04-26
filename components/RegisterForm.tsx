const RegisterForm = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData)

    const res = await fetch('/api/users', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    console.log(result)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="manufacturer" type="text"  />
      <input name="model" type="text"  />
      <input name="year" type="text"  />
      <input name="year" type="text"  />
      <textarea name="description"/>

      <button type="submit">Create Users</button>
    </form>
  );
}

export default RegisterForm;