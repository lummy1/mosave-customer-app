"use client"
import React, { ChangeEvent, Component, FormEvent } from 'react'
import Private from '../components/Layouts/Private';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { connect, useSelector } from 'react-redux';
import ButtonLoader from '../components/ButtonLoader';
import axios from 'axios';
import { IProfile, IState, Props } from './interface';
import { fetch } from '@/redux/features/profile/profileSlice';

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchProfile: () => dispatch(fetch())
    }
  };

//   const mapStateToProps = state => {
//     return {
//         profile: state.profile
//     }
// }

const mapStateToProps = (state: any) => ({
    profile: state.profile
});


class ProfilePage extends Component<Props, IState> {
    values = { firstName: '', lastName: '', email: '', phoneNo: '', role: '', department: '', country: '', city: '', address: '' };
    pass = { currentPassword: '', newPassword: '', newConfirmPassword: '' };
    private imageRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            mount: false,
            account: this.values,
            pass: this.pass,
            image: '',
            countries: [],
            imageBool: false,
            errorMessage: '',
            avatar: '/imgs/profiles/img1.jpg'
        }
        this.imageRef = React.createRef();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ mount: true })
        this.props.fetchProfile();
        console.log(this.props.profile)
        this.getCountries();
    }

    handleChange = (event: any) => {
        const img = event.target.files[0];
        const regex = /(\.jpg|\.jpeg|\.png)$/i;
        if (!regex.exec(img.name)) {
            this.setState({ errorMessage: "Accepted file format is (.png, .jpg, .jpeg)" });
        } else if (img.size > 500000) {
            this.setState({ errorMessage: "Maximum of 500KB image size is allowed" });
        } else {
            this.setState({ errorMessage: '' });
            this.setFileToBase(img);
        }

    };

    //convert image to base 64
    setFileToBase = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ image: reader.result as string });
            this.setState({ imageBool: true });
        }
    }


    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            account: {
                ...this.state.account,
                [e.target.name]: e.target.value,
            },
        });
    }

    handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(({ prevState }: any) => ({ pass: { ...prevState, [e.target.name]: e.target.value } }))
    }

    savePassword = () => {
        console.log(this.state.pass);
    }

    submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = { ...this.state.account, image: this.state.imageBool ? this.state.image : '' }
        console.log(this.state.account);
        //dispatch(update(params))
    }

    ondeleteImage = () => {
        if (this.state.image !== '') {
            this.setState({ image: '' });
        }
    }

    getCountries = async () => {
        try {
            const countryApi = process.env.NEXT_PUBLIC_COUNTRY_API;
            const response = await axios.get(countryApi!, {
                headers: { "Content-Type": "application/json" }
            })
            if (response.data) {
                this.setState({ countries: response.data })
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { firstName, lastName, email, phoneNo, role, department, country, city, address } = this.state.account;
        const { currentPassword, newPassword, newConfirmPassword } = this.state.pass;
        const { data, response, isLoading, isFullLoading, isError, isSuccess, message } = this.props.profile
        return (
            <>
                {this.state.mount && (
                    <Private>
                        <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                            <div className="col-span-full xl:col-auto">
                                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                    <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                                        <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={this.state.image !== '' ? this.state.image : this.state.avatar} alt="profile" />
                                        <small className={`${this.state.errorMessage === '' ? 'hidden' : ''} mt-2 text-xs text-red-600 dark:text-red-600`}>{this.state.errorMessage}</small>
                                        <div>
                                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile picture</h3>

                                            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                                JPG or PNG. Max size of 500KB
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button type="button" onClick={() => this.imageRef.current?.click()} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    <input id="upload" name="file" type="file" ref={this.imageRef} hidden onChange={this.handleChange} />
                                                    <HiOutlineCloudUpload size={20} className="w-4 h-4 mr-2 -ml-1" />
                                                    Upload picture
                                                </button>
                                                <button type="button" onClick={this.ondeleteImage} className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Permissions</h3>
                                    <div className="mb-4">
                                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                        <select id="role" name="role" value={role} onChange={(e) => this.onChange} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option>Select Role</option>
                                            <option>Admin</option>
                                            <option>Super Admin</option>
                                            <option>Editor</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                        <select id="department" name="department" value={department} onChange={(e) => this.onChange} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option>Product Management</option>
                                            <option>Software Development</option>
                                            <option>Technical Consultant</option>
                                            <option>Business Management</option>
                                        </select>
                                    </div>
                                    {/* <div>
                                <button type='button'  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Role</button>
                            </div> */}
                                </div>

                            </div>
                            <div className="col-span-2">
                                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Personal information</h3>
                                    <form action="/" onSubmit={this.submit}>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                <input type="text" value={firstName} onChange={this.onChange} name="firstName" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                        focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="John" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                <input type="text" value={lastName} onChange={this.onChange} name="lastName" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Doe" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" value={email} onChange={this.onChange} name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                <input type="number" value={phoneNo} onChange={this.onChange} name="phoneNo" id="phoneNo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. 08022993329" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                <input type="text" value={address} name="address" id="address" onChange={this.onChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="25, Okeke Street" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                                <input type="text" value={city} name="city" id="city" onChange={this.onChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. Ikoyi" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                                <select id="country" name="country" value={country} onChange={(e) => this.onChange} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option>Select Country</option>
                                                    {this.state.countries.length > 0 && this.state.countries.map((c, i) => (
                                                        <option key={i} value={c.name}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>


                                            <div className="col-span-6 sm:col-full">
                                                <button type="submit"  disabled={isLoading} className={`${isLoading ? "cursor-not-allowed bg-blue-400 opacity-25" : " "} text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg 
                                        text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                                                    <ButtonLoader isLoading={isLoading} text='Save Profile' loadingText='Processing' />  
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* password  */}

                                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Password information</h3>
                                    <form action="/">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                                                <input type="password" value={currentPassword} onChange={this.handlePassword} name="currentPassword" required autoComplete={"off"} id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                                <input type="password" value={newPassword} onChange={this.handlePassword} name='newPassword' autoComplete={"off"} required id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                                <input type="password" value={newConfirmPassword} onChange={this.handlePassword} name="newConfirmPassword" autoComplete={"off"} required id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                            </div>
                                            <div className="col-span-6 sm:col-full">
                                                <button type="button" disabled={isLoading} onClick={this.savePassword} className={` ${isLoading ? "cursor-not-allowed bg-blue-400 opacity-25" : " "} text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                                            <ButtonLoader isLoading={isLoading} text='Save Password' loadingText='Loading' /> 
                                        </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </Private>
                )}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)