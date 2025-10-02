import './SignUp.scss';

export default function signUp() {
    return (
        <div>
            <section id="contact" className="contact" aria-label="Contact heading">
                <form className="contact-form" aria-label="Contact form">

                    <li>Your basic info</li>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="fname" id="fname" required />
                    <label htmlFor="name">Last Name</label>
                    <input type="text" name="name" id="lname" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required />
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="psw" id="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="At least one number and one uppercase and lowercase letter and at least 8 or more characters"
                        required />
                    <label htmlFor="confirmPsw">Confirm Password</label>
                    <input type="password" name="confirmPsw" id="confirmPsw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="At least one number and one uppercase and lowercase letter and at least 8 or more characters"
                        required />

                    <li>Other details</li>
                    <label htmlFor="birtgdate">Birth Date</label>
                    <input type="date" name="birtgdate" id="birtgdate" />

                    <label>Gender</label>
                    <div>
                        <input type="radio" value="male" name="gender" id="male" />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input type="radio" value="female" name="gender" id="female" />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" value="other" name="gender" id="other" />
                        <label htmlFor="other">Other</label>
                    </div>

                    <label htmlFor="country">Country</label>
                    <select name="country" id="country">
                        <option value="au">au</option>
                        <option value="cn">cn</option>
                        <option value="eu">eu</option>
                    </select>

                    <label htmlFor="Profession">Profession</label>
                    <select name="Profession" id="Profession">
                        <option value="Software">Software Development</option>
                        <option value="Data">Data Science</option>
                    </select>

                    <label htmlFor="about">About Me</label>
                    <textarea name="about" id="about"></textarea>

                    <div>
                        <input type="checkbox" value="terms" name="terms" id="terms" />
                        <label htmlFor="terms">I'm accepting Terms and Condotions.</label>
                    </div>

                    <button type="submit" value="signup">Sign Up</button>

                </form>
            </section>
        </div>
    )
}