//// TRIGGER ////
export type TagManagerEventFilterParameter = {
  type: string;
  key: string;
  value: string;
}
export type TagManagerEventFilter = {
  type: string;
  parameter: TagManagerEventFilterParameter[];
}
export type TagManagerTrigger = {
  accountId: string;
  containerId: string;
  triggerId: string;
  name: string;
  type: string;
  customEventFilter?: TagManagerEventFilter[];
  filter?: TagManagerEventFilter[];
  fingerprint: string | number;
};

//// VARIABLE ////
export type TagManagerParameter = {
  type: string;
  key: string;
  value?: string;
  list?: any[];
}
export type TagManagerVariable = {
  accountId: string;
  containerId: string;
  variableId: string | number;
  name: string;
  type: string;
  parameter?: TagManagerParameter[];
  fingerprint: string | number;
  formatValue?: {};
};

//// CUSTOM TEMPLATE ////
export type TagManagerCustomTemplate = {
  accountId: string;
  containerId: string;
  customTemplateId?: string;
  name: string;
  templateId: string;
  fingerprint: string | number;
  templateData: string;
}

/// TAG ///
export type TagManagerTag = {
  accountId: string;
  containerId: string;
  tagId: string | number;
  name: string;
  type: string;
  parameter: TagManagerParameter[];
  fingerprint: string | number;
  firingTriggerId?: string[];
  tagFiringOption?: string;
  monitoringMetadata: {
    type: string;
  }
  consentSettings?: {
    consentStatus: string;
  }
};

//// BUILD-IN VARIABLE ////
export type TagManagerBuildInVariable = {
  accountId: string;
  containerId: string;
  type: string;
  name: string;
}

/// TEMPLATE ///
export type TagManagerTemplate = {
  exportFormatVersion: 2,
  containerVersion: {
    tag: TagManagerTag[];
    variable: TagManagerVariable[];
    trigger: TagManagerTrigger[];
    customTemplate: TagManagerCustomTemplate[];
    builtInVariable: TagManagerBuildInVariable[];
  }
}