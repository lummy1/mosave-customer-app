"use client"
import React, { ChangeEvent, Component, FormEvent, FormEventHandler } from 'react'
import OtpInput from 'react-otp-input';
import Countdown, { zeroPad, CountdownApi } from 'react-countdown';
import { redirect, useRouter } from 'next/navigation';
import Public from '@/app/components/Layouts/Public';

interface IState {
    stateval: number,
    otp: string,
    phone: string
    complete: boolean,
    date: number,
    mount: boolean
}

interface MyProps { }

export default class VerifyEmailPage extends Component<MyProps, IState> {
    countdownApi: CountdownApi | null = null;
    countdownInterval = 0;
    //router = useRouter()

    constructor(props: any) {
        super(props);
        this.state = {
            stateval: 1,
            mount: false,
            phone: '',
            otp: '',
            complete: false,
            date: Date.now() + Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER) // 30 mins
        };
    }


    onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(this.state)
    }

    handleChange = (otp: any) => {
        console.log(otp);
        this.setState({ otp });
    };

    resendOTP = (e: FormEvent) => {
        e.preventDefault();
        console.log('resend')
        this.stop();
    }

    componentDidMount() {
        this.start();
        this.setState({ mount: true })
    }

    componentWillUnmount(): void {
        this.clearInterval();
    }

    start(): void {
        this.countdownInterval = window.setInterval(() => {
            if (this.state.date <= 0) {
                return this.clearInterval();
            }

            this.setState(({ date }) => ({ date: date - 1000 }));
        }, 1000);
    }

    clearInterval(): void {
        window.clearInterval(this.countdownInterval);
    }

    handleStartClick = (): void => {
        this.countdownApi && this.countdownApi.start();
    };

    handlePauseClick = (): void => {
        this.countdownApi && this.countdownApi.pause();
    };

    handleResetClick = (): void => {
        this.setState({ date: Date.now() + Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER) });
    };

    handleUpdate = (): void => {
        this.forceUpdate();
    };

    onComplete = (): void => {
        this.setState({ complete: true });
    }

    setRef = (countdown: Countdown | null): void => {
        if (countdown) {
            this.countdownApi = countdown.getApi();
        }
    };

    isPaused(): boolean {
        return !!(this.countdownApi && this.countdownApi.isPaused());
    }

    isCompleted(): boolean {
        return !!(this.countdownApi && this.countdownApi.isCompleted());
    }

    stop(): void {
        this.countdownApi?.stop();
    }

    render() {
        return (
            <>
                {this.state.mount && (
                    <Public>
                        <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Verify your email
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={this.onSubmit}>
                            <div>
                                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">We've sent an OTP to your registered email address to complete this process.</label>

                                <OtpInput value={this.state.otp} renderInput={(props) => <input {...props} />} onChange={(e) => this.handleChange(e)} numInputs={6} inputType={'password'} shouldAutoFocus={true}
                                    inputStyle={{
                                        width: '3rem',
                                        height: '3rem',
                                        margin: '0 0.5rem 0.5rem 0',
                                        fontSize: '2rem',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(0, 0, 0, 0.3)',
                                    }}
                                    containerStyle={{
                                        justifyContent: 'center',
                                    }}

                                //separator={<span> &nbsp;&nbsp;&nbsp; </span>}
                                />

                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <span className="text-xs text-gray-500 dark:text-gray-300">Code Expires in {' '}
                                        {this.state.date > 0 && (
                                            <Countdown daysInHours={true} key={this.state.date} ref={this.setRef} date={this.state.date} onMount={this.handleUpdate}
                                                onStart={this.handleUpdate} onComplete={this.onComplete} autoStart={true} />
                                        )}
                                    </span>
                                </div>
                                {this.isCompleted() && (
                                    <>
                                        <span className="text-xs text-gray-500 dark:text-gray-300"> Didn't receive the OTP? {' '}</span>
                                        <button type='button' className='text-xs text-gray-500 dark:text-gray-300' onClick={(e) => this.resendOTP(e)}>Resend</button>
                                    </>
                                )}
                            </div>


                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Verify</button>

                        </form>
                    </Public>
                )}
                {/* <Countdown
                    key={this.state.date}
                    ref={this.setRef}
                    date={this.state.date}
                    onMount={this.handleUpdate}
                    onStart={this.handleUpdate}
                    onPause={this.handleUpdate}
                    onComplete={this.handleUpdate}
                    autoStart={true}
                /> */}
                {/* <div>
                    <button
                        type="button"
                        onClick={this.handleStartClick}
                        disabled={!this.isPaused() || this.isCompleted()}
                    >
                        Start
                    </button>{' '}
                    <button
                        type="button"
                        onClick={this.handlePauseClick}
                        disabled={this.isPaused() || this.isCompleted()}
                    >
                        Pause
                    </button>{' '}
                    <button type="button" onClick={this.handleResetClick}>
                        Reset
                    </button>
                </div> */}

            </>
        );
    }
}