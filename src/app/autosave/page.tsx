"use client";
import React, { ChangeEvent, Component, FormEvent } from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import RightBar from "../components/Rightbar";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

export interface IAutosaveProps {}

export interface IAutosaveState {
  mount: boolean;
  currentStep: number;
  params: IParams;
}

interface IParams {
  amount: number;
  frequency: string;
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  timeline: string;
  [x: string]: string | number | boolean | Date | null;
}

export interface IDateProps {
  value: Date;
  name: string;
}
class Autosave extends Component<IAutosaveProps, IAutosaveState> {
  initialValues = {
    amount: 0,
    frequency: "",
    startDate: null,
    endDate: null,
    time: null,
    fundSource: "",
    timeline: "",
  };
  constructor(props: IAutosaveProps) {
    super(props);

    this.state = {
      mount: false,
      currentStep: 1,
      params: this.initialValues,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      },
    });
  };

  handeDateChange = (props: IDateProps) => {
    const { name, value } = props;
    console.log(name);
    console.log(value);
    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      },
    });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state);
  };

  next = () => {
    const currentStep = this.state.currentStep;
    this.setState({
      currentStep: currentStep >= 2 ? 3 : currentStep + 1,
    });
  };

  prev = () => {
    const currentStep = this.state.currentStep;
    this.setState({
      currentStep: currentStep <= 1 ? 1 : currentStep - 1,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="cancelButton" type="button" onClick={this.prev}>
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button className="submitButton" type="button" onClick={this.next}>
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep == 3) {
      return (
        <button className="submitButton" type="submit">
          Submit
        </button>
      );
    }
    return null;
  }

  public render() {
    const { mount } = this.state;
    const { amount, frequency } = this.state.params;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Autosave" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Set up Autosave
                      </h3>
                    </div>
                    <div className="p-7">
                      <form action="/" onSubmit={this.handleSubmit}>
                        <Step1
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          params={this.state.params}
                        />
                        <Step2
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          handleDateChange={this.handeDateChange}
                          params={this.state.params}
                        />
                        <Step3
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          params={this.state.params}
                        />

                        <div className="flex justify-end gap-4.5 mt-5">
                          {this.previousButton()}
                          {this.nextButton()}
                          {this.submitButton()}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <RightBar />
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

export default Autosave;
