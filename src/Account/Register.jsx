function register() {
  return (
    <form>
      <div>
        <label htmlFor="UserName">Username:</label>
        <input type="text" name="UserName" id="UserName" />
      </div>

      <div>
        <label htmlFor="pass">Password:</label>
        <input type="password" name="pass" id="pass" />
      </div>
    </form>
  );
}
