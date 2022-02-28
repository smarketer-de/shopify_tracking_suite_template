import Configurator from "../Configurator";
import { TagManagerTag, TagManagerTrigger, TagManagerVariable } from "../types";

export type detailsInfo = {
  name: string,
  value: string,
}

export default abstract class BaseModule {

  /**
   * The name of the module
   */
  abstract moduleName: string;

  /**
   * Color to display the module with
   */
  abstract color: string;

  namePrefix: string = "";

  configurator: Configurator;
  constructor(configurator: Configurator) {
    this.configurator = configurator;
  }

  getDynamicId() {
    return this.configurator.currentDynamicId++;
  }
  getFingerprint() {
    return Math.round(Math.random() * 500000 + 100000);
  }
  getDetails(): detailsInfo[] {
    return [];
  }
  getNamePrefix() {
    return this.namePrefix.length > 0 ? ` ${this.namePrefix}` : '';
  }

  getTags(): TagManagerTag[] {
    return [];
  }
  getTriggers(): TagManagerTrigger[] {
    return [];
  }
  getVariables(): TagManagerVariable[] {
    return [];
  }

}