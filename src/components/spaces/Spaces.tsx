import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./Spacecomponents";
import {ConfirmModalComponent} from './ConfirmModalComponent';


interface SpaceState {
  spaces: Space[],
  showModal: boolean,
  modalContent: string
}

interface SpacesProps {
  dataService: DataService;
}



export class Spaces extends Component<SpacesProps, SpaceState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
      showModal: false,
      modalContent: ''
    };
    this.reserveSpace = this.reserveSpace.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces();
    this.setState({
      spaces: spaces,
    });
  }

  private async reserveSpace(spaceId: string) {
    const reservationResult = await this.props.dataService.reserveSpace(spaceId)
    if(reservationResult){
      this.setState({
        showModal: true,
        modalContent: `You reserverd the space with id ${spaceId} and got the reservation number ${reservationResult} `
      })
    }else{
      this.setState({
        showModal: true,
        modalContent: `You cannot reserve the space with ${spaceId}`
      })
    }

  }

  private renderSpaces() {
    const rows: any[] = [];
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          location={space.location}
          name={space.name}
          spaceId={space.spaceId}
          reserveSpace={this.reserveSpace}
        />
      );
    }
    return rows;
  }

  private closeModal(){
    this.setState({
      showModal: false,
      modalContent: ''
    })
  }
  render() {
    return (
      <div>
        <h2>Welcome to the spaces page</h2>
        {this.renderSpaces()}
        <ConfirmModalComponent  
          close={this.closeModal} 
          content={this.state.modalContent}
          show={this.state.showModal}
        />
      </div>
    );
  }
}
