import {useState,useEffect} from 'react'
import {Eye,EyeOff} from 'lucide-react';

export default function Register() {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password:'',
        phone:'',
    })

    useEffect(() => {
        document.title = 'Register | Hostel Management';

        return() => {
            document.title = 'Hostel Management';
        };
    },[]);
    

    const [showPassword,setShowPassword] = useState(false);

    const handleChange = (field,value) => {
        setFormData((prev) => ({...prev,[field]:value}));
    }

    const [error,setError] = useState('');

//    const validateName = () => {
//     if(formData.name.trim() === '') {
//         setError('Name is required');
//     }
//     else {
//         setError('');
//     }
//    }

    const nameValid = formData.name.trim().length >= 2;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(formData.email.trim());
    const passwordError = !formData.password
    ? 'Password is required'
    : formData.password.length < 8 
    ? 'Password must contain atleast 8 characters'
    : '';
    const passwordValid = !passwordError;

    const phoneRegex = /^[6-9][0-9]{9}$/;
    const phoneValid = phoneRegex.test(formData.phone)

    const [emailExists, setEmailExists] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [emailChecking, setEmailChecking] = useState(false);
    const [phoneChecking, setPhoneChecking] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const email = formData.email.trim().toLowerCase();

        setEmailExists(false);
        setEmailMessage('');

        if(!email || !emailRegex.test(email)) return;

    },[formData.email]);

    const [touched,setTouched] = useState({
        name:false,
        email:false,
        password:false,
        phone:false
    })

   const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
        name:true,
        email:true,
        password:true,
        phone:true
    })
   
    setError('');
    if(!nameValid)
        return setError("Please enter at least 2 characters for the name.");
    if(!emailValid)
        return setError('Please enter a valid email address.');
        if(emailExists)
            return setError('This email address is already registered.');
        if(!passwordValid) return setError(passwordError);
        if(!phoneValid)
            return setError('Enter a valid 10-digit Indian mobile number.')
        if(phoneExists)
            return setError('This phone number is already registered.');
        if(emailChecking || phoneChecking)
            return setError('Please wait while we check your details.');
        try {
            setLoading(true);

            await API.post('/auth/register', {
                name:formData.name.trim(),
                email:formData.email.trim().toLowerCase(),
                password:formData.password,
                phone:formData.phone    
            });

            alert('✅ Student account created successfully!');
            navigate('/')
        }
        catch(err) {
            console.error('Registration Error',err);
            setError(err.response?.data?.message || 'Registration Failed');
        }
        finally {
            setLoading(false);
        }
   }

   const canSubmit =
     nameValid &&
     emailValid &&
     passwordValid &&
     phoneValid &&
     !emailExists &&
     !phoneExists &&
     !emailChecking &&
     !phoneChecking &&
     !loading;   

return(
    <div>
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        <input 
        value={formData.name}
        onChange={(e) => handleChange('name',e.target.value)}
        /> <br />
        <input 
        value={formData.email}
        onChange={(e) => handleChange('email',e.target.value)}
       /><br/>
       <input 
       value={formData.password}
       onChange={(e) => handleChange('password',e.target.value)}
       type={showPassword? 'text' : 'password'}
        />
        <button type='button'
       onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword? <EyeOff size={20}/> : <Eye size={20} />}
       </button>
        <br/>
        <input 
        value={formData.phone}
        onChange={(e) => handleChange('phone',e.target.value)}
         /><br/>
         <form onSubmit={handleSubmit}>
            <button type='submit'>Signup</button>
         </form>
    </div>
)
}
