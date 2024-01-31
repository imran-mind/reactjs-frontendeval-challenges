

const FormDetails = (props) => {
    const { formData } = props;
    return (
        <div>
            <h1>Success !</h1>
            <hr />
            <span>Name : {formData.name}</span>
            <br />
            <span>Email : {formData.email}</span>
            <br />
            <span>dob : {formData.dob}</span>
            <br />
            <span>password : {formData.password}</span>
            <br />
        </div>
    )
}


export default FormDetails;