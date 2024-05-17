function SignUp() {
  return (
    <form>
      <div>
        <label htmlFor="FirstName">Name:</label>
        <input type="text" name="FirstName" id="FirstName" />
      </div>
      <div>
        <label htmlFor="SurName">Surname:</label>
        <input type="text" name="SurName" id="SurName" />
      </div>
      <div>
        <label htmlFor="UserName">Username:</label>
        <input type="text" name="UserName" id="UserName" />
      </div>
      <div>
        <label htmlFor="pass">Password:</label>
        <input type="password" name="pass" id="pass" />
      </div>
      <div>
        <label htmlFor="dateBirth">Date of birth:</label>
        <input type="date" name="dateBirth" id="dateBirth" />
      </div>
    </form>
  );
}

export default SignUp;
