import { Button, Card } from "@supabase/ui";
import React from "react";
import { ChevronRight } from 'react-feather';
import BaseModule from "./modules/BaseModule";
import Modules from "./steps/0_Modules";
import CoreModule from "./modules/CoreModule";

export default class Configurator extends React.Component<{}, {
  currentPage: JSX.Element,
  modules: BaseModule[],
}> {
  state = {
    currentPage: <Modules configurator={this} />,
    modules: [
      new CoreModule(this)
    ]
  }

  // For modules
  currentDynamicId = 150;

  addModule(mod: BaseModule) {
    this.state.modules.push(mod);
  }

  removeModule(mod: BaseModule) {
    this.setState({
      modules: this.state.modules.filter(m => m !== mod)
    })
  }

  getModules() {
    return this.state.modules;
  }

  goToPage(page: JSX.Element) {
    this.setState({ currentPage: page });
  }

  goToModulesPage() {
    this.goToPage(<Modules configurator={this} />);
  }

  /**
   * Render the current configurator step with additional information
   * 
   * @returns React Node
   */
  render() {
    return (
      <div className="w-3/4 lg:w-1/2 flex items-center flex-col gap-4 mt-6">
        {this.state.currentPage}
      </div>
    )
  }
}