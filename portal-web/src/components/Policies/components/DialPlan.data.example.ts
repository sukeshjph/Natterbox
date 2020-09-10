export const dialPlanData = {
  name: "Chris",
  enabled: true,
  type: "CALL",
  items: [
    {
      id: "85cd1733-b4d5-11ea-bd95-00163e55b82d",
      name: "Finish",
      templateId: 23,
      variables: null,
      subItems: [
        {
          id: "85cd49a0-b4d5-11ea-bd95-00163e55b82d",
          name: "VoiceMail",
          templateId: 24,
          variables: {
            mailbox: {
              type: "USER",
              userId: 566720,
            },
            disableInstructions: false,
            greeting: {
              enabled: false,
              phrase: null,
            },
            emailSettings: null,
            ccSettings: null,
          },
        },
      ],
    },
    {
      id: "85cd7bb0-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85cfae9d-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85cdaf64-b4d5-11ea-bd95-00163e55b82d",
          name: "Speech",
          templateId: 5,
          variables: {
            voice: "EN-GB_HANNAH_AI",
            sayPhrase: "Try again",
          },
        },
      ],
    },
    {
      id: "85cde2e8-b4d5-11ea-bd95-00163e55b82d",
      name: "Connect",
      templateId: 7,
      variables: {
        answerCall: false,
        nextId: "85cd1733-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85ce149d-b4d5-11ea-bd95-00163e55b82d",
          name: "Abi PTwo",
          templateId: 37,
          variables: {
            dialUser: "566720",
            callWaiting: false,
            callerIdName: null,
            dialTimeout: 30,
            screenCaller: false,
            dialType: "SPECIFIED_USER",
          },
        },
      ],
    },
    {
      id: "85ce488d-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85ceafc4-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85ce7c1b-b4d5-11ea-bd95-00163e55b82d",
          name: "Ask",
          templateId: 15,
          variables: {
            sayPhrase:
              "At the tone, say your name. Press any key when finished.",
            calleeCanReject: false,
            alwaysAnnounceCaller: false,
            announcePhrase:
              "Caller announced themselves as sayCallerRecording. Press 1 to accept or hangup to reject",
            timeout: 7,
            acceptKey: "1",
          },
        },
      ],
    },
    {
      id: "85ceafc4-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85d10cc5-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85cee217-b4d5-11ea-bd95-00163e55b82d",
          name: "Caller is great",
          templateId: 25,
          variables: {
            calleeCanReject: false,
            attempts: 3,
            alwaysAnnounceCaller: false,
            announcePhrase: "Caller is great",
            attemptTimeout: 7,
            acceptKey: "1",
          },
        },
      ],
    },
    {
      id: "85cf44cb-b4d5-11ea-bd95-00163e55b82d",
      name: "Start",
      templateId: 1,
      variables: null,
      subItems: [
        {
          id: "85cf7a40-b4d5-11ea-bd95-00163e55b82d",
          name: "654654",
          templateId: 31,
          variables: {
            numberType: "NUMBER",
            delayBeforeAnswering: 0,
            ringtone: "UK",
            internalExtension: "654654",
            callerIdName: null,
            nextId: "85d0a544-b4d5-11ea-bd95-00163e55b82d",
          },
        },
      ],
    },
    {
      id: "85cfae9d-b4d5-11ea-bd95-00163e55b82d",
      name: "Switchboard",
      templateId: 9,
      variables: {
        repeatWelcomeOnTimeout: false,
        badInputPhrase: "I don't recognise that option. Please try again.",
        welcomePhraseBegin: "Welcome to this switchboard. Please press:",
        hearAgainTone: "9",
        attempts: 3,
        attemptTimeout: 7,
        welcomePhraseEnd: "Press 9 to hear these options again.",
        nextId: "85cd7bb0-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85cfdca2-b4d5-11ea-bd95-00163e55b82d",
          name: "Item",
          templateId: 10,
          variables: {
            selectedPhrase: null,
            patternAssignTo: "RM_DIALLED_NUMBER",
            itemPhrase: "2",
            callerIdName: null,
            tone: "2",
            pattern: null,
            nextId: "85ce488d-b4d5-11ea-bd95-00163e55b82d",
          },
        },
        {
          id: "85d00f86-b4d5-11ea-bd95-00163e55b82d",
          name: "Item",
          templateId: 10,
          variables: {
            selectedPhrase: null,
            patternAssignTo: "RM_DIALLED_NUMBER",
            itemPhrase: "3",
            callerIdName: null,
            tone: "3",
            pattern: null,
            nextId: "85d04100-b4d5-11ea-bd95-00163e55b82d",
          },
        },
      ],
    },
    {
      id: "85d04100-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85d10cc5-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85d06f57-b4d5-11ea-bd95-00163e55b82d",
          name: "SMS",
          templateId: 28,
          variables: {
            sendNow: true,
            toNumber: "441234123456",
            text: "Hi",
            fromNumber: "441234987654",
          },
        },
      ],
    },
    {
      id: "85d0a544-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85cfae9d-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85d0d72a-b4d5-11ea-bd95-00163e55b82d",
          name: "Speech",
          templateId: 5,
          variables: {
            voice: "EN-GB_LEWIS_AI",
            sayPhrase: "Hello",
          },
        },
      ],
    },
    {
      id: "85d10cc5-b4d5-11ea-bd95-00163e55b82d",
      name: "Action",
      templateId: 4,
      variables: {
        nextId: "85cde2e8-b4d5-11ea-bd95-00163e55b82d",
      },
      subItems: [
        {
          id: "85d13bab-b4d5-11ea-bd95-00163e55b82d",
          name: "Record",
          templateId: 6,
          variables: {
            emailToAddresses: null,
            beep: "OFF",
            emailCcAddresses: null,
            archivePolicyId: 2003,
            emailSubject: "Your email recording",
            toneStream: null,
            reset: false,
            retain: true,
            channel: "A",
            allowPause: false,
            emailSend: false,
            startOnBridge: true,
          },
        },
      ],
    },
  ],
}
