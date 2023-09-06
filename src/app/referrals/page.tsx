import * as React from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";

export interface IReferralsProps {}

export interface IReferralsState {}

class Referrals extends React.Component<IReferralsProps, IReferralsState> {
  constructor(props: IReferralsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Private2>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Referrals" />
          Referral Page
        </div>
      </Private2>
    );
  }
}

export default Referrals;
