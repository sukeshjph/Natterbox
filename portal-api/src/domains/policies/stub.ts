export const getPolicyByIdStub = {
    "data": {
        "name": "Abi Policy 1",
        "enabled": true,
        "type": "CALL",
        "items": [
            {
                "id": "bf01a9cb-b48b-46d3-b55f-0f86870f767c",
                "name": "From Policy",
                "templateId": 2,
                "variables": {
                    "emailTechSupportOnError": true,
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": []
            },
            {
                "id": "b46117b9-a633-4f1f-bce8-6cb924776aad",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "879eda60-3068-46bc-a31f-852a912ca83b"
                },
                "subItems": [
                    {
                        "id": "54ea3309-c487-4bd9-af37-b31066d5fbcd",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"dialMethod\":\"connectAction\",\"connectAction\":{\"ddi\":{\"method\":\"NUMBER\",\"target\":null},\"public\":{\"method\":\"NUMBER\",\"target\":\"12094\"},\"outbound\":{\"method\":\"NUMBER\",\"target\":null},\"extension\":{\"method\":\"NUMBER\",\"target\":\"12094\"},\"default\":{\"method\":\"NUMBER\",\"target\":null}},\"trigger\":[\"CALL_CONNECTED\",\"CAMP_EXIT\"],\"connectTimeout\":30,\"callWaiting\":false,\"hangupAfterBridge\":false,\"continueOnFail\":true,\"dtmfEnabled\":false,\"dtmfStream\":null,\"dtmfToneLength\":2000,\"callerIdName\":null,\"screen\":false,\"screenHook\":\"c1b059b37fd04211b9e3f0626940f1cf\",\"camp\":{\"enabled\":false,\"campEntry\":\"RING_TONE\",\"music\":\"moh://default\",\"chimeMessage\":\"I am sorry to keep you waiting\",\"campProgress\":\"MUSIC\",\"chimeDelay\":10,\"dialAttempts\":3,\"dialSleep\":10,\"campExit\":\"1\"},\"devOrgId\":865,\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectCallCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "879eda60-3068-46bc-a31f-852a912ca83b"
                        }
                    }
                ]
            },
            {
                "id": "879eda60-3068-46bc-a31f-852a912ca83b",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "616bdf34-c867-4b30-9a98-d82d825ec097",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectTriggerCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "2b32ff31-ace1-4278-8433-9ffc755c3136",
                "name": "Call Queue Script",
                "templateId": 117,
                "variables": {
                    "nextId": "1d704a4c-5aa5-423a-a636-a2785216b1f3"
                },
                "subItems": [
                    {
                        "id": "38d0479e-d7cc-44b5-9b00-e6561f646851",
                        "name": "Call Queue Script",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"callBack\":{\"enabled\":true,\"activationKey\":\"#\",\"activationPosition\":1,\"activationElapsedTime\":3,\"leaveVoiceMail\":true,\"acl\":\"ANY\",\"aclRegex\":\"\",\"cli\":\"\",\"cliPresentation\":\"WITHHOLD\",\"customCli\":[]},\"chime\":[],\"callQueue\":{\"algorithm\":\"priority\"}}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/CallQueueCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "nextId": "1d704a4c-5aa5-423a-a636-a2785216b1f3"
                        }
                    }
                ]
            },
            {
                "id": "1d704a4c-5aa5-423a-a636-a2785216b1f3",
                "name": "Call Queue",
                "templateId": 7,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "37c85cfe-2a9d-4a8c-bf61-63911ca883f1",
                        "name": "Abi Call Queue",
                        "templateId": 49,
                        "variables": {
                            "ringTargets": [
                                {
                                    "groupId": 1808,
                                    "distribution": {
                                        "algorithm": "LONGEST_IDLE"
                                    },
                                    "wrapUpTime": 60,
                                    "wrapUpFailedTime": 60,
                                    "ringTime": 30,
                                    "screenCaller": false,
                                    "callWaiting": false,
                                    "skills": {
                                        "enabled": true,
                                        "mode": "BUILT_IN",
                                        "parameters": {
                                            "agentsRequireAllSkills": false,
                                            "ignoreUnskilledAgents": false,
                                            "unskilledAgentsDeferTime": 10,
                                            "algorithm": "SUM"
                                        }
                                    }
                                }
                            ],
                            "holdMusic": {
                                "type": "AUTO"
                            },
                            "callerIdName": null,
                            "announcements": [],
                            "announcePeriod": 60,
                            "maxCalls": 100,
                            "maxTime": 30,
                            "exitKey": null,
                            "solidCallThreshold": 120,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "839e4be6-2878-444d-b3e1-bc981f7186cd",
                "name": "Script Engine",
                "templateId": 117,
                "variables": {
                    "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                },
                "subItems": [
                    {
                        "id": "b02a5045-0d93-4ebb-a89f-d9d7170dfdf4",
                        "name": "Script Engine",
                        "templateId": 118,
                        "variables": {
                            "script": "--\r\n-- connectorId: The Id of the Salesforce connector to be used with sf_query and sf_store methods\r\nlocal connectorId = 1532\r\n\r\n-- nameSpacePrefix: The prefix used by AVS\r\nlocal nameSpacePrefix = 'nbavs'\r\n\r\n-- User: Abi Prakash\r\n-- Date: 27/11/2018\r\n-- Time: 11:13:07\r\n--\r\n\r\n--continue your script here\r\n\r\n--local caseId = session.expand_macro(\"$(SForce_Current.Id[1])\")\r\n--session.set(\"CTIPopRecordID\", caseId, true)\r\n\r\nsession.set(\"CTIPopRecordID\",\"5001o00003iuFDgAAM\", true)\r\n--session.notify(\"Hello: This is a text notification....\", 'USER', '7522', 'Abi!!!')\r\n\r\n",
                            "notifyEmailAddress": "abirami.gnanapragasam@natterbocx.com",
                            "notifyHttpUrl": null,
                            "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                        }
                    }
                ]
            },
            {
                "id": "9bd11790-df10-4513-97c9-3069dab6026e",
                "name": "Query Object",
                "templateId": 117,
                "variables": {
                    "nextId": "839e4be6-2878-444d-b3e1-bc981f7186cd"
                },
                "subItems": [
                    {
                        "id": "d0b86911-40fa-4138-a6ad-f09c1d9b17a4",
                        "name": "Query Object",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"connectorId\":1532,\"soql\":\"SELECT Id FROM Account WHERE ( ( Name LIKE 'test' ) ) ORDER BY Id ASC LIMIT 4\",\"resultSet\":\"Current\",\"trigger\":[\"RECORDS_FOUND\"],\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/QuerySalesForceCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "839e4be6-2878-444d-b3e1-bc981f7186cd"
                        }
                    }
                ]
            },
            {
                "id": "94896049-745e-4fb1-b005-0a233ba39dd3",
                "name": "Script Engine",
                "templateId": 117,
                "variables": {
                    "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                },
                "subItems": [
                    {
                        "id": "950504a8-d603-40bc-a63d-c372b575b630",
                        "name": "whisper text",
                        "templateId": 118,
                        "variables": {
                            "script": "--\r\n-- connectorId: The Id of the Salesforce connector to be used with sf_query and sf_store methods\r\nlocal connectorId = 1532\r\n\r\n-- nameSpacePrefix: The prefix used by AVS\r\nlocal nameSpacePrefix = 'nbavs'\r\n\r\n-- User: Abi Prakash\r\n-- Date: 27/11/2018\r\n-- Time: 11:44:54\r\n--\r\n\r\n--continue your script here\r\nsession.set(\"CTIText\",\"This is Abi testing whisper text\",true)\r\n\r\n",
                            "notifyEmailAddress": null,
                            "notifyHttpUrl": null,
                            "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                        }
                    }
                ]
            },
            {
                "id": "4ba02931-192e-4005-a595-6301ef52e56c",
                "name": "Speak",
                "templateId": 4,
                "variables": {
                    "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                },
                "subItems": [
                    {
                        "id": "6422e47a-ea7b-40fa-adc0-fad288b324b4",
                        "name": "Speak",
                        "templateId": 5,
                        "variables": {
                            "voice": "EN-AU_NOAH_AI",
                            "sayPhrase": "<say-as interpret-as='telephone'>+441293885222</say-as>"
                        }
                    }
                ]
            },
            {
                "id": "cb3aff60-fa4d-4660-8351-8d8ec89ead4e",
                "name": "Inbound Numbers",
                "templateId": 1,
                "variables": null,
                "subItems": [
                    {
                        "id": "f25d7f5e-4a0b-4b04-86b1-bee1181c3bf0",
                        "name": "01133 000056",
                        "templateId": 3,
                        "variables": {
                            "callerIdName": null,
                            "billModel": "STANDARD",
                            "delayBeforeAnswering": 0,
                            "ringtone": "AUTO",
                            "publicNumber": "441133000056",
                            "nextId": "a5a726de-40f8-4d11-a277-6b82b866a4b6"
                        }
                    }
                ]
            },
            {
                "id": "ccd01f8c-ee37-45f7-93b1-3bae168b75ac",
                "name": "Finish",
                "templateId": 23,
                "variables": null,
                "subItems": [
                    {
                        "id": "cbefd055-8efd-4963-b4d8-7b3844a64b0e",
                        "name": "Voice Mail",
                        "templateId": 24,
                        "variables": {
                            "mailbox": {
                                "type": "USER",
                                "userId": 7522
                            },
                            "disableInstructions": false,
                            "greeting": {
                                "enabled": false,
                                "phrase": null
                            },
                            "emailSettings": null,
                            "ccSettings": null
                        }
                    }
                ]
            },
            {
                "id": "85a75a6c-54b9-4816-ac60-300567582a5e",
                "name": "Extension Number",
                "templateId": 1,
                "variables": null,
                "subItems": [
                    {
                        "id": "d7937827-e216-4d0d-9b9a-08f94c600ff0",
                        "name": "Extension Number",
                        "templateId": 31,
                        "variables": {
                            "delayBeforeAnswering": 0,
                            "numberType": "NUMBER",
                            "internalExtension": "5326",
                            "ringtone": "UK",
                            "callerIdName": null,
                            "nextId": "d160538c-4dc6-47ce-a7bb-74814e5c80bb"
                        }
                    }
                ]
            },
            {
                "id": "2e714c00-590e-4b55-a0fd-2c2e49b6776f",
                "name": "Query Object",
                "templateId": 117,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "06aa0b8b-7d22-4b93-a280-4600bfb98d4c",
                        "name": "Query Object",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"connectorId\":1532,\"soql\":\"SELECT Id FROM Case WHERE ( ( AccountId = '0011o00001clYAn' ) ) ORDER BY Id ASC LIMIT 5\",\"resultSet\":\"MyData\",\"trigger\":[\"RECORDS_FOUND\"],\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/QuerySalesForceCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "7fa2abbb-fa0a-4873-88d4-bbf26323877a"
                        }
                    }
                ]
            },
            {
                "id": "7fa2abbb-fa0a-4873-88d4-bbf26323877a",
                "name": "Manage Properties",
                "templateId": 117,
                "variables": {
                    "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                },
                "subItems": [
                    {
                        "id": "97eafb4b-2fe6-4fe6-ba0f-fec809df9781",
                        "name": "Manage Properties",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"connectorId\":1532,\"devOrgId\":865,\"enableDebug\":false,\"namespacePrefix\":\"\",\"customProperties\":[],\"ctiRecordPop\":\"$(SForce_MyData.Id)\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ModifyPropertiesCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                        }
                    }
                ]
            },
            {
                "id": "67f2f49e-70ab-4503-99ea-3bd064c17765",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "7778d0fb-a45c-45f5-a088-dc263b2ca1c3"
                },
                "subItems": [
                    {
                        "id": "ac6c65e6-154b-4e5f-9e47-2ac09673e582",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"dialMethod\":\"connectAction\",\"connectAction\":{\"ddi\":{\"method\":\"NUMBER\",\"target\":null},\"public\":{\"method\":\"NUMBER\",\"target\":\"12094\"},\"outbound\":{\"method\":\"NUMBER\",\"target\":null},\"extension\":{\"method\":\"NUMBER\",\"target\":\"12094\"},\"default\":{\"method\":\"NUMBER\",\"target\":null}},\"trigger\":[\"CALL_CONNECTED\",\"CALL_NOT_CONNECTED\",\"CAMP_EXIT\"],\"connectTimeout\":30,\"callWaiting\":false,\"hangupAfterBridge\":false,\"transferAfterConnect\":\"\",\"continueOnFail\":true,\"dtmfEnabled\":false,\"dtmfStream\":null,\"dtmfToneLength\":2000,\"callerIdName\":null,\"screen\":false,\"screenHook\":\"823176fb03f44fccb0c0b2420e40ffdd\",\"camp\":{\"enabled\":false,\"campEntry\":\"RING_TONE\",\"music\":\"moh://default\",\"chimeMessage\":\"I am sorry to keep you waiting\",\"campProgress\":\"MUSIC\",\"chimeDelay\":10,\"dialAttempts\":3,\"dialSleep\":10,\"campExit\":\"1\"},\"devOrgId\":865,\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectCallCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "7778d0fb-a45c-45f5-a088-dc263b2ca1c3"
                        }
                    }
                ]
            },
            {
                "id": "7778d0fb-a45c-45f5-a088-dc263b2ca1c3",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "73a04788-7a48-4ae0-af24-10f61e740b0f",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectTriggerCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "a5a726de-40f8-4d11-a277-6b82b866a4b6",
                "name": "Record a Call",
                "templateId": 4,
                "variables": {
                    "nextId": "cab39ba9-7c02-4676-8ebb-7dcee8ac319b"
                },
                "subItems": [
                    {
                        "id": "91310919-5f43-4a61-b240-ffb3b250b1c6",
                        "name": "Record a Call",
                        "templateId": 6,
                        "variables": {
                            "channel": "A",
                            "emailSend": true,
                            "emailToAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailCcAddresses": null,
                            "emailSubject": "inbound 828 this leg",
                            "reset": true,
                            "retain": true,
                            "startOnBridge": true,
                            "archivePolicyId": null,
                            "beep": "OFF",
                            "toneStream": null,
                            "allowPause": true
                        }
                    }
                ]
            },
            {
                "id": "910a32af-9e2b-4c91-ab18-43739a8c4cd1",
                "name": "Script Engine",
                "templateId": 117,
                "variables": {
                    "nextId": "a5a726de-40f8-4d11-a277-6b82b866a4b6"
                },
                "subItems": [
                    {
                        "id": "19714c62-2960-48c6-b126-0753f5309368",
                        "name": "Script Engine",
                        "templateId": 118,
                        "variables": {
                            "script": "--\r\n-- connectorId: The Id of the Salesforce connector to be used with sf_query and sf_store methods\r\nlocal connectorId = 1532\r\n\r\n-- nameSpacePrefix: The prefix used by AVS\r\nlocal nameSpacePrefix = 'nbavs'\r\n\r\n-- User: Abi Prakash\r\n-- Date: 29/05/2019\r\n-- Time: 13:04:04\r\n--\r\n\r\n--continue your script here\r\nlocal analyzers = {}\r\nanalyzers[1] = {}\r\nanalyzers[1].name = 'TRANSCRIPTION_VOICEBASE'\r\nanalyzers[1].channel = 'SELF'\r\nanalyzers[2] = {}\r\nanalyzers[2].name = 'AUDIO'\r\nanalyzers[2].channel = 'SELF'\r\n \r\nsession.analyze(analyzers)\r\n\r\n",
                            "notifyEmailAddress": null,
                            "notifyHttpUrl": null,
                            "nextId": "a5a726de-40f8-4d11-a277-6b82b866a4b6"
                        }
                    }
                ]
            },
            {
                "id": "dfc6835a-ce57-4d8a-9bba-1c58e47f2891",
                "name": "Extension Number",
                "templateId": 1,
                "variables": null,
                "subItems": [
                    {
                        "id": "ed7121af-5fc9-4ab6-9fcb-a9d8c0a72eb8",
                        "name": "Extension Number",
                        "templateId": 31,
                        "variables": {
                            "delayBeforeAnswering": 0,
                            "numberType": "NUMBER",
                            "internalExtension": "4335",
                            "ringtone": "UK",
                            "callerIdName": null,
                            "nextId": "942c2075-ebac-4bb0-a9b6-df0fc86da7d0"
                        }
                    }
                ]
            },
            {
                "id": "8c666762-cbe3-4e6d-9516-a527148e0d99",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "3c9787d7-6893-425e-a88e-f6c12f0ab848"
                },
                "subItems": [
                    {
                        "id": "b3b5b443-0064-4ec1-9e49-d2376620672c",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"dialMethod\":\"connectAction\",\"connectAction\":{\"ddi\":{\"method\":\"NUMBER\",\"target\":null},\"public\":{\"method\":\"NUMBER\",\"target\":null},\"outbound\":{\"method\":\"NUMBER\",\"target\":null},\"extension\":{\"method\":\"NUMBER\",\"target\":\"447443265274\"},\"default\":{\"method\":\"NUMBER\",\"target\":null}},\"trigger\":[\"CALL_CONNECTED\",\"CALL_NOT_CONNECTED\",\"CAMP_EXIT\"],\"connectTimeout\":30,\"callWaiting\":false,\"hangupAfterBridge\":false,\"transferAfterConnect\":\"\",\"continueOnFail\":true,\"dtmfEnabled\":false,\"dtmfStream\":null,\"dtmfToneLength\":2000,\"callerIdName\":null,\"screen\":false,\"screenHook\":\"297f9a352b3b48c59881755ff5907ce5\",\"camp\":{\"enabled\":false,\"campEntry\":\"RING_TONE\",\"music\":\"moh://default\",\"chimeMessage\":\"I am sorry to keep you waiting\",\"campProgress\":\"MUSIC\",\"chimeDelay\":10,\"dialAttempts\":3,\"dialSleep\":10,\"campExit\":\"1\"},\"devOrgId\":865,\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectCallCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "3c9787d7-6893-425e-a88e-f6c12f0ab848"
                        }
                    }
                ]
            },
            {
                "id": "3c9787d7-6893-425e-a88e-f6c12f0ab848",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "7b8de2a5-f367-4369-b343-bee557c6f302",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectTriggerCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "942c2075-ebac-4bb0-a9b6-df0fc86da7d0",
                "name": "Call Queue Script",
                "templateId": 117,
                "variables": {
                    "nextId": "732127df-4def-4157-aecc-9b59dcde4616"
                },
                "subItems": [
                    {
                        "id": "e2f4f7ec-77d4-4946-b2cf-e5ad9b636a15",
                        "name": "Call Queue Script",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"callBack\":{\"enabled\":true,\"activationKey\":\"#\",\"activationPosition\":1,\"activationElapsedTime\":3,\"leaveVoiceMail\":true,\"acl\":\"ANY\",\"aclRegex\":\"\",\"cli\":\"\",\"cliPresentation\":\"WITHHOLD\",\"customCli\":[]},\"chime\":[],\"callQueue\":{\"algorithm\":\"priority\"}}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/CallQueueCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "nextId": "732127df-4def-4157-aecc-9b59dcde4616"
                        }
                    }
                ]
            },
            {
                "id": "732127df-4def-4157-aecc-9b59dcde4616",
                "name": "Call Queue",
                "templateId": 7,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "04fb80d9-fae2-478f-b667-2164a75b9227",
                        "name": "ABIIII Call queue",
                        "templateId": 49,
                        "variables": {
                            "ringTargets": [
                                {
                                    "groupId": 1808,
                                    "distribution": {
                                        "algorithm": "LONGEST_IDLE"
                                    },
                                    "wrapUpTime": 10,
                                    "wrapUpFailedTime": 10,
                                    "ringTime": 10,
                                    "screenCaller": false,
                                    "callWaiting": false,
                                    "skills": {
                                        "enabled": true,
                                        "mode": "BUILT_IN",
                                        "parameters": {
                                            "agentsRequireAllSkills": true,
                                            "ignoreUnskilledAgents": true,
                                            "unskilledAgentsDeferTime": 10,
                                            "algorithm": "SUM"
                                        }
                                    }
                                }
                            ],
                            "holdMusic": {
                                "type": "AUTO"
                            },
                            "callerIdName": null,
                            "announcements": [],
                            "announcePeriod": 60,
                            "maxCalls": 100,
                            "maxTime": 30,
                            "exitKey": null,
                            "solidCallThreshold": 120,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "31e38f0a-1a4a-4fe2-9b2e-929fafc54560",
                "name": "Manage Properties",
                "templateId": 117,
                "variables": {
                    "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                },
                "subItems": [
                    {
                        "id": "97eab978-3b7d-4eed-930e-c4bc09a49241",
                        "name": "Manage Properties",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"connectorId\":1532,\"devOrgId\":865,\"enableDebug\":false,\"namespacePrefix\":\"\",\"customProperties\":[],\"ctiRecordPop\":\"0011o00001ltD9i\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ModifyPropertiesCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                        }
                    }
                ]
            },
            {
                "id": "e6106b08-e173-4c92-8fa2-ed957cd83a5f",
                "name": "Notify",
                "templateId": 4,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "05ad80fa-e9db-4b89-86e4-84a546e23ab5",
                        "name": "SMS",
                        "templateId": 28,
                        "variables": {
                            "toNumber": "447976838303",
                            "fromNumber": "447459712607",
                            "text": "UK number test from Stage",
                            "sendNow": true
                        }
                    }
                ]
            },
            {
                "id": "790d1f81-d5be-48f4-b1b8-008c776c8429",
                "name": "Record a Call",
                "templateId": 4,
                "variables": {
                    "nextId": "68aa22c9-b2d0-4026-af4b-8aa061af5a10"
                },
                "subItems": [
                    {
                        "id": "15bbcde7-65c8-47a7-8194-d8d995c7cfa5",
                        "name": "Abirami Gnanapragasam",
                        "templateId": 6,
                        "variables": {
                            "channel": "A",
                            "emailSend": true,
                            "emailToAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailCcAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailSubject": "abirami.gnanapragasam@redmatter.com",
                            "reset": true,
                            "retain": true,
                            "startOnBridge": true,
                            "archivePolicyId": null,
                            "beep": "OFF",
                            "toneStream": null,
                            "allowPause": true
                        }
                    }
                ]
            },
            {
                "id": "68aa22c9-b2d0-4026-af4b-8aa061af5a10",
                "name": "Record a Call",
                "templateId": 4,
                "variables": {
                    "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                },
                "subItems": [
                    {
                        "id": "2e06ed36-2298-4a3d-9b41-f5105bb4b024",
                        "name": "Abirami Gnanapragasam",
                        "templateId": 6,
                        "variables": {
                            "channel": "B",
                            "emailSend": true,
                            "emailToAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailCcAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailSubject": "abirami.gnanapragasam@redmatter.com",
                            "reset": true,
                            "retain": true,
                            "startOnBridge": true,
                            "archivePolicyId": null,
                            "beep": "OFF",
                            "toneStream": null,
                            "allowPause": true
                        }
                    }
                ]
            },
            {
                "id": "0d9b4dfe-dcd9-4a0f-a04c-18fa0120826c",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "6404bfd7-a272-42d7-9a25-ffdaf85740c9"
                },
                "subItems": [
                    {
                        "id": "7812304b-62df-464b-9948-4975f3cc1c69",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"dialMethod\":\"connectAction\",\"connectAction\":{\"ddi\":{\"method\":\"NUMBER\",\"target\":null},\"public\":{\"method\":\"USER\",\"target\":\"7522\"},\"outbound\":{\"method\":\"NUMBER\",\"target\":null},\"extension\":{\"method\":\"NUMBER\",\"target\":\"12094\"},\"default\":{\"method\":\"NUMBER\",\"target\":null}},\"trigger\":[\"CALL_CONNECTED\",\"CALL_NOT_CONNECTED\",\"CAMP_EXIT\"],\"connectTimeout\":30,\"callWaiting\":false,\"hangupAfterBridge\":false,\"transferAfterConnect\":\"\",\"continueOnFail\":true,\"dtmfEnabled\":false,\"dtmfStream\":null,\"dtmfToneLength\":2000,\"callerIdName\":null,\"screen\":false,\"screenHook\":\"6509ad76ac294e789646f2a2f8156a5e\",\"camp\":{\"enabled\":false,\"campEntry\":\"RING_TONE\",\"music\":\"moh://default\",\"chimeMessage\":\"I am sorry to keep you waiting\",\"campProgress\":\"MUSIC\",\"chimeDelay\":10,\"dialAttempts\":3,\"dialSleep\":10,\"campExit\":\"1\"},\"devOrgId\":865,\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectCallCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "6404bfd7-a272-42d7-9a25-ffdaf85740c9"
                        }
                    }
                ]
            },
            {
                "id": "6404bfd7-a272-42d7-9a25-ffdaf85740c9",
                "name": "Connect a Call",
                "templateId": 117,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "77c75c1c-cf11-4786-9d61-9e35c1566c24",
                        "name": "Connect a Call",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectTriggerCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "00c2de0d-c1c2-48d1-a79a-01c49bc59f90",
                "name": "Notify",
                "templateId": 4,
                "variables": {
                    "nextId": "f154c3f7-de2b-40d9-9269-e4a821cfd3a6"
                },
                "subItems": []
            },
            {
                "id": "f154c3f7-de2b-40d9-9269-e4a821cfd3a6",
                "name": "Notify",
                "templateId": 117,
                "variables": {
                    "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                },
                "subItems": [
                    {
                        "id": "1eea5be9-6324-4030-98ab-f19a30e5f989",
                        "name": "Notification",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"connectorId\":1532,\"namespacePrefix\":\"\",\"policyType\":\"CALL\",\"items\":[{\"targetType\":\"USER\",\"targetUUID\":\"SELF\",\"targetUserID\":\"$(UserID)\",\"senderDisplayName\":\"System User\",\"notificationText\":\"testing user notifications\"}]}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/NotifyNotificationCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "nextId": "b46117b9-a633-4f1f-bce8-6cb924776aad"
                        }
                    }
                ]
            },
            {
                "id": "d160538c-4dc6-47ce-a7bb-74814e5c80bb",
                "name": "Notify",
                "templateId": 4,
                "variables": {
                    "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                },
                "subItems": [
                    {
                        "id": "3f661dc1-ed3f-4629-a99a-badcf81419c9",
                        "name": "SMS",
                        "templateId": 28,
                        "variables": {
                            "toNumber": "447459712607",
                            "fromNumber": "447459712607",
                            "text": "YO!",
                            "sendNow": true
                        }
                    }
                ]
            },
            {
                "id": "ff541b9e-f468-423d-90ba-f36ecdac558d",
                "name": "Script Engine",
                "templateId": 117,
                "variables": {
                    "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                },
                "subItems": [
                    {
                        "id": "055ef12f-422d-4ea6-b684-789d98dd28e7",
                        "name": "Script Engine",
                        "templateId": 118,
                        "variables": {
                            "script": "--\r\n-- connectorId: The Id of the Salesforce connector to be used with sf_query and sf_store methods\r\nlocal connectorId = 1532\r\n\r\n-- nameSpacePrefix: The prefix used by AVS\r\nlocal nameSpacePrefix = 'nbavs'\r\n\r\n-- User: Abi Prakash\r\n-- Date: 23/01/2020\r\n-- Time: 09:41:56\r\n--\r\n\r\n--continue your script here\r\nenable_debug('email')\r\n\r\nlocal email = {}\r\nemail.toRecipients = 'abirami.gnanapragasam@redmatter.com'\r\nemail.subject = 'Testing On demand recording'\r\n\r\nlocal beepAlert = {}\r\nbeepAlert.alertChannel = 'SELF'\r\nbeepAlert.tgml = '%(100,15000,800)'\r\n\r\nsession.record_channel('SELF', 'ON_DEMAND', 0, email, beepAlert)\r\nsession.set_permission('ON_DEMAND_RECORD_START', 'ENABLE', 'SELF')\r\nsession.set_permission('ON_DEMAND_RECORD_PAUSE', 'ENABLE', 'SELF')\r\nsession.set_permission('ON_DEMAND_RECORD_DISABLE', 'ENABLE', 'SELF')\r\n\r\n",
                            "notifyEmailAddress": "abirami.gnanapragasam@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "67f2f49e-70ab-4503-99ea-3bd064c17765"
                        }
                    }
                ]
            },
            {
                "id": "e031ed6f-7fad-4e69-bf47-3b4b72334099",
                "name": "Extension Number",
                "templateId": 1,
                "variables": null,
                "subItems": [
                    {
                        "id": "eec884a4-53f8-49a2-b02d-1e2a4cde5120",
                        "name": "Extension Number",
                        "templateId": 31,
                        "variables": {
                            "delayBeforeAnswering": 0,
                            "numberType": "NUMBER",
                            "internalExtension": "5136",
                            "ringtone": "UK",
                            "callerIdName": null,
                            "nextId": "db9d0e56-97aa-479a-b8bb-47c2f41785be"
                        }
                    }
                ]
            },
            {
                "id": "bd973977-c202-450f-bfbe-9028789834aa",
                "name": "Hunt Group",
                "templateId": 117,
                "variables": {
                    "nextId": "3358b8b6-fa6e-4e9d-b10b-0108949f4786"
                },
                "subItems": [
                    {
                        "id": "72ddaea0-a4de-4dda-9888-299122450122",
                        "name": "Hunt Group",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"dialMethod\":\"followMe\",\"followMe\":[{\"method\":\"NUMBER\",\"target\":\"12094\",\"start\":0,\"connectTimeout\":3,\"screen\":false}],\"trigger\":[\"CALL_CONNECTED\",\"CALL_NOT_CONNECTED\",\"CAMP_EXIT\"],\"connectTimeout\":30,\"callWaiting\":false,\"hangupAfterBridge\":false,\"transferAfterConnect\":\"\",\"continueOnFail\":true,\"dtmfEnabled\":false,\"dtmfStream\":null,\"dtmfToneLength\":2000,\"callerIdName\":null,\"screen\":false,\"screenHook\":\"3e77b89a95964e70bbf35d3e9fd5265b\",\"camp\":{\"enabled\":false,\"campEntry\":\"RING_TONE\",\"music\":\"moh://default\",\"chimeMessage\":\"I am sorry to keep you waiting\",\"campProgress\":\"MUSIC\",\"chimeDelay\":10,\"dialAttempts\":3,\"dialSleep\":10,\"campExit\":\"1\"},\"devOrgId\":865,\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectCallCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "3358b8b6-fa6e-4e9d-b10b-0108949f4786"
                        }
                    }
                ]
            },
            {
                "id": "3358b8b6-fa6e-4e9d-b10b-0108949f4786",
                "name": "Hunt Group",
                "templateId": 117,
                "variables": {
                    "nextId": "942c2075-ebac-4bb0-a9b6-df0fc86da7d0"
                },
                "subItems": [
                    {
                        "id": "b294862c-dbc0-4087-9eeb-5a158293d33d",
                        "name": "Hunt Group",
                        "templateId": 118,
                        "variables": {
                            "script": "local jsonData = [[\r{\"namespacePrefix\":\"\",\"policyType\":\"CALL\"}\r]]\r\rlocal loaded_chunk = assert(loadfile('local://865/ConnectTriggerCPBXV1'))\rloaded_chunk()\rres = execute(jsonData)\rreturn res\r\r\r",
                            "notifyEmailAddress": "luadebug@redmatter.com",
                            "notifyHttpUrl": null,
                            "nextId": "942c2075-ebac-4bb0-a9b6-df0fc86da7d0"
                        }
                    }
                ]
            },
            {
                "id": "cab39ba9-7c02-4676-8ebb-7dcee8ac319b",
                "name": "Record a Call",
                "templateId": 4,
                "variables": {
                    "nextId": "0d9b4dfe-dcd9-4a0f-a04c-18fa0120826c"
                },
                "subItems": [
                    {
                        "id": "f68d7811-2eae-4c15-b577-05957419270c",
                        "name": "Record a Call",
                        "templateId": 6,
                        "variables": {
                            "channel": "B",
                            "emailSend": true,
                            "emailToAddresses": [
                                "abirami.gnanapragasam@redmatter.com"
                            ],
                            "emailCcAddresses": null,
                            "emailSubject": "inbound 828 other leg",
                            "reset": true,
                            "retain": true,
                            "startOnBridge": true,
                            "archivePolicyId": null,
                            "beep": "OFF",
                            "toneStream": null,
                            "allowPause": false
                        }
                    }
                ]
            },
            {
                "id": "db9d0e56-97aa-479a-b8bb-47c2f41785be",
                "name": "Finish",
                "templateId": 23,
                "variables": null,
                "subItems": []
            }
        ]
    }
}


export const getPoliciesStub =
  {
      "data": [
          {
              "id": 798,
              "name": "Mobile (From)",
              "enabled": true,
              "type": "CALL",
              "created": "2015-08-06T13:03:53+00:00",
              "modified": "2015-08-06T12:03:53+00:00"
          },
          {
              "id": 800,
              "name": "Mobile (To)",
              "enabled": true,
              "type": "CALL",
              "created": "2015-08-06T13:03:53+00:00",
              "modified": "2015-08-06T12:03:53+00:00"
          },
          {
              "id": 1043,
              "name": "Test_Ringall",
              "enabled": true,
              "type": "CALL",
              "created": "2015-11-04T10:39:48+00:00",
              "modified": "2016-07-22T16:45:19+00:00"
          },
          {
              "id": 1151,
              "name": "P T 2012  Ring Order",
              "enabled": true,
              "type": "CALL",
              "created": "2015-11-19T14:12:30+00:00",
              "modified": "2016-08-02T10:36:16+00:00"
          },
          {
              "id": 1255,
              "name": "junk policy",
              "enabled": true,
              "type": "CALL",
              "created": "2016-03-02T16:30:55+00:00",
              "modified": "2016-09-16T10:20:46+00:00"
          },
          {
              "id": 1289,
              "name": "wattda hella 2024  Ring Order",
              "enabled": true,
              "type": "CALL",
              "created": "2016-03-08T10:49:28+00:00",
              "modified": "2016-03-08T10:49:28+00:00"
          },
          {
              "id": 1291,
              "name": "Group test",
              "enabled": true,
              "type": "CALL",
              "created": "2016-03-08T15:36:08+00:00",
              "modified": "2016-09-16T14:25:43+00:00"
          },
          {
              "id": 1327,
              "name": "Marco Dziekan 2021  Ring Order",
              "enabled": true,
              "type": "CALL",
              "created": "2016-04-11T13:26:20+00:00",
              "modified": "2016-04-11T13:07:52+00:00"
          },
          {
              "id": 1339,
              "name": "Marek Lua",
              "enabled": true,
              "type": "CALL",
              "created": "2016-04-20T10:57:43+00:00",
              "modified": "2017-11-24T10:05:48+00:00"
          },
          {
              "id": 1451,
              "name": "Marek SF components2",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-06T12:44:49+00:00",
              "modified": "2019-04-03T15:25:26+00:00"
          },
          {
              "id": 1526,
              "name": "ncTrigger",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-16T12:29:43+00:00",
              "modified": "2016-09-22T11:17:25+00:00"
          },
          {
              "id": 1528,
              "name": "Test_MassDial",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-16T16:29:03+00:00",
              "modified": "2016-05-16T15:29:03+00:00"
          },
          {
              "id": 1530,
              "name": "RuleTester",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-17T11:44:04+00:00",
              "modified": "2019-04-03T15:25:47+00:00"
          },
          {
              "id": 1555,
              "name": "MarekRegressions",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-18T16:22:03+00:00",
              "modified": "2020-04-15T16:13:29+00:00"
          },
          {
              "id": 1571,
              "name": "VoicePolicy1",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-24T10:27:58+00:00",
              "modified": "2016-05-24T09:28:44+00:00"
          },
          {
              "id": 1577,
              "name": "PortalRules",
              "enabled": true,
              "type": "CALL",
              "created": "2016-05-25T12:17:13+00:00",
              "modified": "2016-08-30T09:51:39+00:00"
          },
          {
              "id": 1623,
              "name": "Maric Onion 2076  Ring Order",
              "enabled": true,
              "type": "CALL",
              "created": "2016-06-15T12:29:18+00:00",
              "modified": "2016-08-30T12:21:58+00:00"
          },
          {
              "id": 1627,
              "name": "Mekan2 Kekan 2033  Ring Order",
              "enabled": true,
              "type": "CALL",
              "created": "2016-06-15T12:41:16+00:00",
              "modified": "2016-06-15T11:43:33+00:00"
          },
          {
              "id": 1634,
              "name": "Connect Testing",
              "enabled": true,
              "type": "CALL",
              "created": "2016-06-17T10:57:24+00:00",
              "modified": "2020-02-04T11:11:30+00:00"
          },
          {
              "id": 1681,
              "name": "James Test",
              "enabled": true,
              "type": "CALL",
              "created": "2016-07-04T15:15:32+00:00",
              "modified": "2020-04-17T08:02:57+00:00"
          },
          {
              "id": 2167,
              "name": "Marek DDI",
              "enabled": true,
              "type": "CALL",
              "created": "2016-07-12T17:42:15+00:00",
              "modified": "2018-01-05T10:35:15+00:00"
          },
          {
              "id": 2297,
              "name": "__User:4569:vm test",
              "enabled": true,
              "type": "CALL",
              "created": "2016-07-22T10:51:17+00:00",
              "modified": "2016-09-16T09:58:45+00:00"
          },
          {
              "id": 2621,
              "name": "__User:3095:Supriya Prabhakaran",
              "enabled": true,
              "type": "CALL",
              "created": "2016-08-22T12:03:41+00:00",
              "modified": "2019-03-18T10:21:46+00:00"
          },
          {
              "id": 2841,
              "name": "Non Call As They Get",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2016-09-12T13:48:20+00:00",
              "modified": "2018-01-03T17:12:36+00:00"
          },
          {
              "id": 2843,
              "name": "NC Trigger Policy",
              "enabled": true,
              "type": "CALL",
              "created": "2016-09-12T14:48:14+00:00",
              "modified": "2016-09-23T08:25:50+00:00"
          },
          {
              "id": 3977,
              "name": "second NC",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2016-09-22T12:10:34+00:00",
              "modified": "2017-06-21T15:22:36+00:00"
          },
          {
              "id": 3979,
              "name": "Emo Demo",
              "enabled": true,
              "type": "CALL",
              "created": "2016-09-22T13:42:41+00:00",
              "modified": "2016-10-18T10:33:11+00:00"
          },
          {
              "id": 4015,
              "name": "Policy Links Tester",
              "enabled": true,
              "type": "CALL",
              "created": "2016-09-26T09:29:53+00:00",
              "modified": "2016-09-26T08:29:53+00:00"
          },
          {
              "id": 4355,
              "name": "backendpolicy",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-17T17:21:54+00:00",
              "modified": "2019-02-21T12:04:54+00:00"
          },
          {
              "id": 4379,
              "name": "EncodingPortal",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-20T12:07:59+00:00",
              "modified": "2016-10-20T11:46:34+00:00"
          },
          {
              "id": 4381,
              "name": "EncodingCallFlows",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-20T12:09:34+00:00",
              "modified": "2016-10-20T11:09:34+00:00"
          },
          {
              "id": 4383,
              "name": "fsdfsdff",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-20T13:34:11+00:00",
              "modified": "2016-12-09T16:11:17+00:00"
          },
          {
              "id": 4385,
              "name": "sdfgfsdg",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-20T14:13:13+00:00",
              "modified": "2016-10-20T13:13:13+00:00"
          },
          {
              "id": 4389,
              "name": "ddi wtf",
              "enabled": true,
              "type": "CALL",
              "created": "2016-10-24T12:22:26+00:00",
              "modified": "2017-06-26T15:18:35+00:00"
          },
          {
              "id": 4392,
              "name": "New Connect Testing",
              "enabled": true,
              "type": "CALL",
              "created": "2016-11-02T15:20:38+00:00",
              "modified": "2016-11-30T17:35:11+00:00"
          },
          {
              "id": 4395,
              "name": "Mamma mia",
              "enabled": true,
              "type": "CALL",
              "created": "2016-11-08T15:39:40+00:00",
              "modified": "2018-05-11T16:28:08+00:00"
          },
          {
              "id": 4399,
              "name": "Lee Test",
              "enabled": true,
              "type": "CALL",
              "created": "2016-11-15T16:56:20+00:00",
              "modified": "2016-11-15T17:05:47+00:00"
          },
          {
              "id": 4441,
              "name": "My New Call Flow",
              "enabled": true,
              "type": "CALL",
              "created": "2016-12-06T09:38:29+00:00",
              "modified": "2016-12-06T09:38:41+00:00"
          },
          {
              "id": 4471,
              "name": "Renata Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-01-12T12:29:48+00:00",
              "modified": "2017-01-12T12:29:48+00:00"
          },
          {
              "id": 4633,
              "name": "Josh Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-03-20T11:33:49+00:00",
              "modified": "2017-06-30T12:30:55+00:00"
          },
          {
              "id": 4792,
              "name": "Pop it",
              "enabled": true,
              "type": "CALL",
              "created": "2017-03-30T15:37:12+00:00",
              "modified": "2017-03-30T14:45:19+00:00"
          },
          {
              "id": 4818,
              "name": "Josh Lua Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-04-06T11:43:22+00:00",
              "modified": "2017-04-06T11:23:41+00:00"
          },
          {
              "id": 4820,
              "name": "Josh Lua Test DA",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-04-06T12:30:46+00:00",
              "modified": "2017-11-22T15:41:03+00:00"
          },
          {
              "id": 4821,
              "name": "Demo Apex Call",
              "enabled": true,
              "type": "CALL",
              "created": "2017-04-06T13:20:56+00:00",
              "modified": "2017-04-07T16:01:05+00:00"
          },
          {
              "id": 4825,
              "name": "Josh Camp Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-04-07T10:29:21+00:00",
              "modified": "2017-04-07T12:30:57+00:00"
          },
          {
              "id": 4827,
              "name": "Non Call Chatter",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-04-10T10:51:01+00:00",
              "modified": "2017-04-10T10:03:59+00:00"
          },
          {
              "id": 4835,
              "name": "Josh New Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-04-13T09:41:53+00:00",
              "modified": "2017-04-13T09:38:34+00:00"
          },
          {
              "id": 4841,
              "name": "Lua AVS Policy",
              "enabled": true,
              "type": "CALL",
              "created": "2017-04-18T16:27:16+00:00",
              "modified": "2017-04-19T14:46:51+00:00"
          },
          {
              "id": 5425,
              "name": "aa Connect",
              "enabled": true,
              "type": "CALL",
              "created": "2017-06-13T14:25:58+00:00",
              "modified": "2018-01-23T09:56:27+00:00"
          },
          {
              "id": 5459,
              "name": "__User:6520:Maro Dziekanio",
              "enabled": true,
              "type": "CALL",
              "created": "2017-06-15T13:37:00+00:00",
              "modified": "2017-06-15T12:40:45+00:00"
          },
          {
              "id": 5461,
              "name": "Non Call Outbound",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-06-20T09:38:02+00:00",
              "modified": "2017-06-20T08:38:02+00:00"
          },
          {
              "id": 5473,
              "name": "Test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-07-04T12:11:26+00:00",
              "modified": "2017-07-04T11:11:26+00:00"
          },
          {
              "id": 5499,
              "name": "Josh Tests new",
              "enabled": true,
              "type": "CALL",
              "created": "2017-07-07T16:32:03+00:00",
              "modified": "2017-07-11T11:44:16+00:00"
          },
          {
              "id": 5500,
              "name": "OutboundReporting",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-07-18T17:27:15+00:00",
              "modified": "2017-08-24T09:40:37+00:00"
          },
          {
              "id": 5515,
              "name": "CallQtest",
              "enabled": true,
              "type": "CALL",
              "created": "2017-07-26T11:04:07+00:00",
              "modified": "2018-02-28T16:30:42+00:00"
          },
          {
              "id": 5521,
              "name": "__User:7105:eettzsfut ffuchsfut",
              "enabled": true,
              "type": "CALL",
              "created": "2017-07-28T14:05:37+00:00",
              "modified": "2017-07-28T13:05:37+00:00"
          },
          {
              "id": 5523,
              "name": "InboundReporting",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-08-03T12:15:52+00:00",
              "modified": "2018-03-09T15:18:14+00:00"
          },
          {
              "id": 5525,
              "name": "Multiple components policy",
              "enabled": true,
              "type": "CALL",
              "created": "2017-08-08T09:30:56+00:00",
              "modified": "2017-08-08T08:35:52+00:00"
          },
          {
              "id": 5531,
              "name": "__User:7141:Marek External",
              "enabled": true,
              "type": "CALL",
              "created": "2017-08-31T17:38:19+00:00",
              "modified": "2018-05-25T09:16:09+00:00"
          },
          {
              "id": 5533,
              "name": "__User:6917:permisionbasic permitted",
              "enabled": true,
              "type": "CALL",
              "created": "2017-08-31T17:44:41+00:00",
              "modified": "2019-11-05T10:06:52+00:00"
          },
          {
              "id": 5537,
              "name": "yrsdNC",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-09-07T15:57:39+00:00",
              "modified": "2017-09-07T14:57:39+00:00"
          },
          {
              "id": 5541,
              "name": "__User:7143:Marek ExternalTwo",
              "enabled": true,
              "type": "CALL",
              "created": "2017-09-12T11:47:48+00:00",
              "modified": "2017-09-12T10:47:48+00:00"
          },
          {
              "id": 5549,
              "name": "DTMF tests",
              "enabled": true,
              "type": "CALL",
              "created": "2017-10-09T12:46:02+00:00",
              "modified": "2017-10-09T14:34:27+00:00"
          },
          {
              "id": 5554,
              "name": "Notify newline test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-10-10T17:23:08+00:00",
              "modified": "2018-01-04T10:13:31+00:00"
          },
          {
              "id": 5592,
              "name": "Group VM test",
              "enabled": true,
              "type": "CALL",
              "created": "2017-10-19T17:13:00+00:00",
              "modified": "2017-10-19T16:16:28+00:00"
          },
          {
              "id": 5625,
              "name": "__User:7145:Vincent Schröder",
              "enabled": true,
              "type": "CALL",
              "created": "2017-11-06T15:51:21+00:00",
              "modified": "2019-11-20T15:57:50+00:00"
          },
          {
              "id": 5670,
              "name": "MyScript",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2017-11-23T10:55:12+00:00",
              "modified": "2017-11-23T10:55:12+00:00"
          },
          {
              "id": 5674,
              "name": "__User:7224:qwerrrr qwerrrr",
              "enabled": true,
              "type": "CALL",
              "created": "2017-11-23T16:09:04+00:00",
              "modified": "2017-11-23T16:09:04+00:00"
          },
          {
              "id": 5685,
              "name": "CRO Queue Analytics tests",
              "enabled": true,
              "type": "CALL",
              "created": "2017-11-29T15:05:28+00:00",
              "modified": "2018-04-24T14:58:50+00:00"
          },
          {
              "id": 5693,
              "name": "qwewqe",
              "enabled": true,
              "type": "CALL",
              "created": "2017-12-04T13:06:10+00:00",
              "modified": "2017-12-04T13:06:10+00:00"
          },
          {
              "id": 5714,
              "name": "One Flow To All Them Rule",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-04T09:26:35+00:00",
              "modified": "2018-01-05T10:35:50+00:00"
          },
          {
              "id": 5716,
              "name": "Test Email",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-04T10:05:38+00:00",
              "modified": "2018-01-04T10:14:53+00:00"
          },
          {
              "id": 5720,
              "name": "Test email backend",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-04T10:19:06+00:00",
              "modified": "2018-01-04T10:19:06+00:00"
          },
          {
              "id": 5722,
              "name": "Non Call",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2018-01-05T10:21:05+00:00",
              "modified": "2018-01-05T10:21:05+00:00"
          },
          {
              "id": 5724,
              "name": "Outbound Calls",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-05T10:21:06+00:00",
              "modified": "2020-06-12T20:38:41+00:00"
          },
          {
              "id": 5726,
              "name": "DDI Calls",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-05T10:21:08+00:00",
              "modified": "2020-03-16T16:59:33+00:00"
          },
          {
              "id": 5728,
              "name": "Listen In Service",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-05T10:21:10+00:00",
              "modified": "2020-03-25T12:46:10+00:00"
          },
          {
              "id": 5730,
              "name": "Default Inbound",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-05T10:21:13+00:00",
              "modified": "2020-04-23T12:21:54+00:00"
          },
          {
              "id": 5739,
              "name": "Skills Test Sapien",
              "enabled": true,
              "type": "CALL",
              "created": "2018-01-23T10:14:10+00:00",
              "modified": "2018-01-23T10:14:10+00:00"
          },
          {
              "id": 5748,
              "name": "Test Policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-02-02T11:42:26+00:00",
              "modified": "2018-02-02T11:42:26+00:00"
          },
          {
              "id": 5757,
              "name": "Marek Testing Test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-02-09T15:00:36+00:00",
              "modified": "2018-02-09T15:00:36+00:00"
          },
          {
              "id": 5759,
              "name": "ghj",
              "enabled": true,
              "type": "CALL",
              "created": "2018-02-26T14:17:03+00:00",
              "modified": "2018-11-14T10:58:48+00:00"
          },
          {
              "id": 5761,
              "name": "CallbackChime tests",
              "enabled": true,
              "type": "CALL",
              "created": "2018-02-26T15:06:17+00:00",
              "modified": "2018-02-26T15:06:17+00:00"
          },
          {
              "id": 5763,
              "name": "Marek Skills and Callback Examples",
              "enabled": true,
              "type": "CALL",
              "created": "2018-02-26T15:06:41+00:00",
              "modified": "2018-11-20T10:41:00+00:00"
          },
          {
              "id": 5780,
              "name": "DTMF checks",
              "enabled": true,
              "type": "CALL",
              "created": "2018-03-13T13:28:43+00:00",
              "modified": "2018-03-13T13:28:43+00:00"
          },
          {
              "id": 5781,
              "name": "OmniTest",
              "enabled": true,
              "type": "CALL",
              "created": "2018-03-26T11:21:06+00:00",
              "modified": "2018-06-20T15:40:46+00:00"
          },
          {
              "id": 5783,
              "name": "Test New Policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-03T16:25:12+00:00",
              "modified": "2018-04-03T16:12:55+00:00"
          },
          {
              "id": 5785,
              "name": "__User:7148:Radzio Dziekan",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-03T17:02:32+00:00",
              "modified": "2020-04-15T16:09:55+00:00"
          },
          {
              "id": 5787,
              "name": "avs call flows",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-04T12:16:44+00:00",
              "modified": "2018-04-04T14:45:24+00:00"
          },
          {
              "id": 5794,
              "name": "Dont need no policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-10T10:51:34+00:00",
              "modified": "2018-04-11T08:15:06+00:00"
          },
          {
              "id": 5800,
              "name": "Big ol VM policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-11T10:35:00+00:00",
              "modified": "2018-05-23T14:38:30+00:00"
          },
          {
              "id": 5809,
              "name": "__User:7316:call centresab",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-26T10:15:39+00:00",
              "modified": "2018-04-26T09:15:39+00:00"
          },
          {
              "id": 5823,
              "name": "policy to import",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-27T12:36:38+00:00",
              "modified": "2018-04-30T08:29:26+00:00"
          },
          {
              "id": 5827,
              "name": "policy for importing",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T10:04:02+00:00",
              "modified": "2018-04-30T09:05:11+00:00"
          },
          {
              "id": 5829,
              "name": "sabinaclone",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T10:23:59+00:00",
              "modified": "2018-04-30T11:52:34+00:00"
          },
          {
              "id": 5831,
              "name": "sabina call queue",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T12:00:57+00:00",
              "modified": "2018-05-04T08:37:41+00:00"
          },
          {
              "id": 5833,
              "name": "sabinaclone3",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T12:23:52+00:00",
              "modified": "2018-05-01T08:18:37+00:00"
          },
          {
              "id": 5835,
              "name": "sabinaclone4",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T12:43:01+00:00",
              "modified": "2018-05-04T09:51:59+00:00"
          },
          {
              "id": 5837,
              "name": "sabinaclone7",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T13:07:32+00:00",
              "modified": "2018-04-30T12:17:45+00:00"
          },
          {
              "id": 5839,
              "name": "sabinaclone8",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T15:39:26+00:00",
              "modified": "2018-04-30T14:39:26+00:00"
          },
          {
              "id": 5841,
              "name": "sabinatwin3",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T15:41:21+00:00",
              "modified": "2018-05-01T13:36:36+00:00"
          },
          {
              "id": 5843,
              "name": "Policy to change",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T15:52:37+00:00",
              "modified": "2018-04-30T15:00:53+00:00"
          },
          {
              "id": 5846,
              "name": "sabinacloning",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T16:12:25+00:00",
              "modified": "2018-04-30T15:12:25+00:00"
          },
          {
              "id": 5854,
              "name": "sabspolicy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T16:37:09+00:00",
              "modified": "2018-04-30T15:37:55+00:00"
          },
          {
              "id": 5855,
              "name": "sabinaclone9",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T16:42:56+00:00",
              "modified": "2018-04-30T15:54:23+00:00"
          },
          {
              "id": 5861,
              "name": "sabinaclone10",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T16:58:05+00:00",
              "modified": "2018-05-01T08:16:44+00:00"
          },
          {
              "id": 5863,
              "name": "sabinaclone11",
              "enabled": true,
              "type": "CALL",
              "created": "2018-04-30T17:10:23+00:00",
              "modified": "2018-04-30T16:19:42+00:00"
          },
          {
              "id": 5889,
              "name": "oscar clone",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T10:20:21+00:00",
              "modified": "2018-05-01T09:30:22+00:00"
          },
          {
              "id": 5895,
              "name": "oscar clone 2",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T10:31:38+00:00",
              "modified": "2018-05-01T09:31:38+00:00"
          },
          {
              "id": 5903,
              "name": "oscar clone two",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T10:54:41+00:00",
              "modified": "2018-05-01T10:00:01+00:00"
          },
          {
              "id": 5907,
              "name": "oscar clone three",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T11:02:36+00:00",
              "modified": "2018-05-01T10:02:57+00:00"
          },
          {
              "id": 5911,
              "name": "oscar link",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T14:04:52+00:00",
              "modified": "2018-05-01T13:51:02+00:00"
          },
          {
              "id": 5915,
              "name": "number sab",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-01T15:49:55+00:00",
              "modified": "2018-05-01T14:49:55+00:00"
          },
          {
              "id": 5919,
              "name": "CTI Pops",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-03T13:46:11+00:00",
              "modified": "2018-10-12T08:26:58+00:00"
          },
          {
              "id": 5925,
              "name": "sabina dash",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-04T09:48:31+00:00",
              "modified": "2018-05-04T08:48:31+00:00"
          },
          {
              "id": 5927,
              "name": "sip lip sabs",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-04T11:41:01+00:00",
              "modified": "2018-05-08T15:43:43+00:00"
          },
          {
              "id": 5931,
              "name": "sabi casey",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-04T16:56:27+00:00",
              "modified": "2018-05-08T15:48:29+00:00"
          },
          {
              "id": 5932,
              "name": "ExportBoi1",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-08T13:55:44+00:00",
              "modified": "2018-05-08T12:59:33+00:00"
          },
          {
              "id": 5934,
              "name": "ExportBoi2",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-08T14:04:33+00:00",
              "modified": "2018-05-09T14:37:59+00:00"
          },
          {
              "id": 5936,
              "name": "sabi hunt group",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-11T10:09:29+00:00",
              "modified": "2019-10-15T08:12:19+00:00"
          },
          {
              "id": 5937,
              "name": "sabina macro",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-15T10:28:02+00:00",
              "modified": "2018-05-15T10:16:11+00:00"
          },
          {
              "id": 5939,
              "name": "Quueue screen",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-15T13:54:19+00:00",
              "modified": "2018-05-16T16:14:12+00:00"
          },
          {
              "id": 5949,
              "name": "soundtags",
              "enabled": true,
              "type": "CALL",
              "created": "2018-05-23T13:26:06+00:00",
              "modified": "2018-05-24T14:56:06+00:00"
          },
          {
              "id": 5963,
              "name": "sdfsd",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-11T16:34:32+00:00",
              "modified": "2018-06-11T15:34:32+00:00"
          },
          {
              "id": 5969,
              "name": "__User:7256:Dush Brainwashed",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-13T15:28:58+00:00",
              "modified": "2018-06-28T09:45:58+00:00"
          },
          {
              "id": 5972,
              "name": "sab cli call queue",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-18T12:13:10+00:00",
              "modified": "2018-06-18T11:13:10+00:00"
          },
          {
              "id": 5983,
              "name": "sabi cli call queue",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-18T16:02:00+00:00",
              "modified": "2018-06-18T16:02:00+00:00"
          },
          {
              "id": 5987,
              "name": "sabi cli request skills",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-18T16:04:26+00:00",
              "modified": "2018-06-21T13:21:17+00:00"
          },
          {
              "id": 5989,
              "name": "sab callback triggered based on time",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-19T08:58:56+00:00",
              "modified": "2018-06-21T10:21:26+00:00"
          },
          {
              "id": 5997,
              "name": "__User:7319:sabi import",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-19T11:17:43+00:00",
              "modified": "2018-06-19T11:17:43+00:00"
          },
          {
              "id": 5999,
              "name": "__User:7317:sabi import",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-19T11:20:07+00:00",
              "modified": "2018-06-19T11:20:07+00:00"
          },
          {
              "id": 6001,
              "name": "Abi call tests",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-19T13:02:39+00:00",
              "modified": "2018-11-19T15:29:19+00:00"
          },
          {
              "id": 6003,
              "name": "Abi Policy 1",
              "enabled": true,
              "type": "CALL",
              "created": "2018-06-19T13:49:09+00:00",
              "modified": "2020-03-10T12:35:03+00:00"
          },
          {
              "id": 6005,
              "name": "PCI Numbers",
              "enabled": true,
              "type": "CALL",
              "created": "2018-07-03T16:04:46+00:00",
              "modified": "2019-04-03T15:52:47+00:00"
          },
          {
              "id": 6175,
              "name": "wegonnahackit",
              "enabled": true,
              "type": "CALL",
              "created": "2018-07-24T16:03:31+00:00",
              "modified": "2018-07-24T15:06:38+00:00"
          },
          {
              "id": 6187,
              "name": "cti-dtmf test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-07-31T13:21:36+00:00",
              "modified": "2018-07-31T13:20:45+00:00"
          },
          {
              "id": 6189,
              "name": "testttt",
              "enabled": true,
              "type": "CALL",
              "created": "2018-07-31T14:28:31+00:00",
              "modified": "2018-07-31T13:28:31+00:00"
          },
          {
              "id": 6207,
              "name": "__User:7522:Abi Prakash",
              "enabled": true,
              "type": "CALL",
              "created": "2018-08-01T14:55:43+00:00",
              "modified": "2020-05-20T15:34:56+00:00"
          },
          {
              "id": 6209,
              "name": "Local Presence",
              "enabled": true,
              "type": "CALL",
              "created": "2018-08-03T11:42:36+00:00",
              "modified": "2018-08-03T10:51:45+00:00"
          },
          {
              "id": 6211,
              "name": "regex test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-08-09T15:23:26+00:00",
              "modified": "2018-08-09T14:23:26+00:00"
          },
          {
              "id": 6269,
              "name": "New apext test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-12T16:30:49+00:00",
              "modified": "2018-09-12T15:30:49+00:00"
          },
          {
              "id": 6297,
              "name": "wer",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-21T16:11:54+00:00",
              "modified": "2019-04-04T12:30:59+00:00"
          },
          {
              "id": 6298,
              "name": "Call que",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-26T11:41:18+00:00",
              "modified": "2018-11-20T10:34:15+00:00"
          },
          {
              "id": 6306,
              "name": "werss",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-26T16:38:10+00:00",
              "modified": "2018-09-26T15:38:13+00:00"
          },
          {
              "id": 6308,
              "name": "Private policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-27T09:19:10+00:00",
              "modified": "2018-09-27T09:26:30+00:00"
          },
          {
              "id": 6310,
              "name": "Private 3",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-27T10:06:26+00:00",
              "modified": "2018-09-27T09:06:26+00:00"
          },
          {
              "id": 6312,
              "name": "Piss",
              "enabled": true,
              "type": "CALL",
              "created": "2018-09-27T10:17:39+00:00",
              "modified": "2018-09-27T09:17:39+00:00"
          },
          {
              "id": 6316,
              "name": "que ann",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-03T17:12:33+00:00",
              "modified": "2018-10-03T16:12:45+00:00"
          },
          {
              "id": 6317,
              "name": "Pop test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-11T12:18:15+00:00",
              "modified": "2018-10-11T11:18:15+00:00"
          },
          {
              "id": 6320,
              "name": "Catherines policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-19T16:37:37+00:00",
              "modified": "2018-10-19T15:50:54+00:00"
          },
          {
              "id": 6329,
              "name": "Cat was here",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-30T10:19:36+00:00",
              "modified": "2020-05-27T15:43:15+00:00"
          },
          {
              "id": 6333,
              "name": "__User:7819:Cat Kitty",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-30T12:16:14+00:00",
              "modified": "2020-06-16T11:16:10+00:00"
          },
          {
              "id": 6337,
              "name": "Pop Records cat",
              "enabled": true,
              "type": "CALL",
              "created": "2018-10-31T10:50:19+00:00",
              "modified": "2018-10-31T15:44:57+00:00"
          },
          {
              "id": 6375,
              "name": "Group is in policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-01T14:48:43+00:00",
              "modified": "2018-11-01T15:11:28+00:00"
          },
          {
              "id": 6377,
              "name": "Weighted Queue Tests",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-06T11:20:35+00:00",
              "modified": "2018-11-06T13:09:09+00:00"
          },
          {
              "id": 6379,
              "name": "Connect Testing 2",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-07T14:35:20+00:00",
              "modified": "2018-11-07T14:35:20+00:00"
          },
          {
              "id": 6403,
              "name": "cats macro policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-13T11:25:43+00:00",
              "modified": "2018-11-14T14:23:07+00:00"
          },
          {
              "id": 6405,
              "name": "__User:7843:Catherina Iscool",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-13T13:44:52+00:00",
              "modified": "2018-11-13T13:44:52+00:00"
          },
          {
              "id": 6407,
              "name": "cats macro one again",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2018-11-13T14:09:22+00:00",
              "modified": "2018-11-13T14:11:11+00:00"
          },
          {
              "id": 6411,
              "name": "Big Policy Switchboards",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-13T17:15:21+00:00",
              "modified": "2019-04-03T15:52:41+00:00"
          },
          {
              "id": 6413,
              "name": "Test Query 111",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-13T17:21:32+00:00",
              "modified": "2018-11-14T10:48:15+00:00"
          },
          {
              "id": 6415,
              "name": "Small Policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-13T17:21:59+00:00",
              "modified": "2018-11-13T17:22:11+00:00"
          },
          {
              "id": 6445,
              "name": "call recording policy",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-19T14:47:49+00:00",
              "modified": "2019-07-15T16:31:43+00:00"
          },
          {
              "id": 6480,
              "name": "__User:7396:ctistage testing",
              "enabled": true,
              "type": "CALL",
              "created": "2018-11-27T18:15:59+00:00",
              "modified": "2018-11-27T18:15:59+00:00"
          },
          {
              "id": 6485,
              "name": "qwe",
              "enabled": true,
              "type": "CALL",
              "created": "2018-12-04T11:09:47+00:00",
              "modified": "2018-12-04T11:09:47+00:00"
          },
          {
              "id": 6487,
              "name": "Steve IVR lua",
              "enabled": true,
              "type": "CALL",
              "created": "2018-12-05T16:24:52+00:00",
              "modified": "2018-12-05T16:27:15+00:00"
          },
          {
              "id": 6491,
              "name": "__User:7999:Greg InglisTwo",
              "enabled": true,
              "type": "CALL",
              "created": "2018-12-11T16:13:46+00:00",
              "modified": "2019-03-11T17:40:50+00:00"
          },
          {
              "id": 6493,
              "name": "Greg Test",
              "enabled": true,
              "type": "CALL",
              "created": "2018-12-13T14:13:36+00:00",
              "modified": "2019-05-23T10:46:12+00:00"
          },
          {
              "id": 6497,
              "name": "Send message in notify app",
              "enabled": true,
              "type": "CALL",
              "created": "2019-01-14T11:36:06+00:00",
              "modified": "2019-01-17T10:23:47+00:00"
          },
          {
              "id": 6503,
              "name": "Marek Policy 12234",
              "enabled": true,
              "type": "CALL",
              "created": "2019-01-29T11:39:08+00:00",
              "modified": "2019-01-29T11:39:08+00:00"
          },
          {
              "id": 6614,
              "name": "Sf stuff",
              "enabled": true,
              "type": "CALL",
              "created": "2019-03-12T11:11:35+00:00",
              "modified": "2019-03-12T11:11:35+00:00"
          },
          {
              "id": 6628,
              "name": "__User:7730:user test",
              "enabled": true,
              "type": "CALL",
              "created": "2019-03-18T10:21:24+00:00",
              "modified": "2019-03-18T10:32:21+00:00"
          },
          {
              "id": 6631,
              "name": "Test hunt",
              "enabled": true,
              "type": "CALL",
              "created": "2019-03-21T16:54:55+00:00",
              "modified": "2019-03-21T17:00:46+00:00"
          },
          {
              "id": 6635,
              "name": "Cat was here again",
              "enabled": true,
              "type": "CALL",
              "created": "2019-03-26T15:58:13+00:00",
              "modified": "2019-12-23T16:27:57+00:00"
          },
          {
              "id": 6643,
              "name": "__User:8065:Alvaro Silva",
              "enabled": true,
              "type": "CALL",
              "created": "2019-04-16T09:54:02+00:00",
              "modified": "2019-11-12T17:07:52+00:00"
          },
          {
              "id": 6647,
              "name": "__User:8061:Wan Yau",
              "enabled": true,
              "type": "CALL",
              "created": "2019-05-07T09:10:52+00:00",
              "modified": "2020-02-21T17:20:34+00:00"
          },
          {
              "id": 6649,
              "name": "testies",
              "enabled": true,
              "type": "CALL",
              "created": "2019-05-07T15:10:16+00:00",
              "modified": "2019-05-07T14:10:27+00:00"
          },
          {
              "id": 6650,
              "name": "Adi Mobile Call",
              "enabled": true,
              "type": "CALL",
              "created": "2019-05-13T10:54:46+00:00",
              "modified": "2019-05-13T10:54:46+00:00"
          },
          {
              "id": 6681,
              "name": "Aditya Vijay",
              "enabled": true,
              "type": "CALL",
              "created": "2019-06-10T09:53:21+00:00",
              "modified": "2019-06-10T09:53:21+00:00"
          },
          {
              "id": 6683,
              "name": "__User:8069:Suleiman Ahmed",
              "enabled": true,
              "type": "CALL",
              "created": "2019-06-10T11:13:01+00:00",
              "modified": "2019-07-04T14:18:19+00:00"
          },
          {
              "id": 6721,
              "name": "Suleiman Ahmed",
              "enabled": true,
              "type": "CALL",
              "created": "2019-06-27T09:06:03+00:00",
              "modified": "2019-06-27T09:08:25+00:00"
          },
          {
              "id": 6722,
              "name": "alvaro",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-03T10:51:44+00:00",
              "modified": "2020-04-08T13:29:05+00:00"
          },
          {
              "id": 6761,
              "name": "Dan",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-19T12:27:49+00:00",
              "modified": "2019-07-19T12:27:49+00:00"
          },
          {
              "id": 6763,
              "name": "wan",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-19T12:39:27+00:00",
              "modified": "2019-07-19T12:39:27+00:00"
          },
          {
              "id": 6765,
              "name": "__User:8063:Daniel Sydney",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-22T09:15:33+00:00",
              "modified": "2019-07-22T09:15:33+00:00"
          },
          {
              "id": 6776,
              "name": "__User:8114:Chris Wilmott",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-31T14:36:49+00:00",
              "modified": "2019-07-31T14:36:49+00:00"
          },
          {
              "id": 6778,
              "name": "Delay test - CW",
              "enabled": true,
              "type": "CALL",
              "created": "2019-07-31T14:37:52+00:00",
              "modified": "2020-04-22T11:41:32+00:00"
          },
          {
              "id": 6781,
              "name": "Sam Internal",
              "enabled": true,
              "type": "CALL",
              "created": "2019-08-16T08:18:30+00:00",
              "modified": "2020-01-29T11:04:48+00:00"
          },
          {
              "id": 6800,
              "name": "__nbavs__system_reporting__",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2019-08-27T14:18:00+00:00",
              "modified": "2019-12-17T16:05:11+00:00"
          },
          {
              "id": 6843,
              "name": "post roll outs for PLAT-19383",
              "enabled": true,
              "type": "CALL",
              "created": "2019-09-10T10:50:39+00:00",
              "modified": "2019-11-12T11:09:42+00:00"
          },
          {
              "id": 6889,
              "name": "Marek Postrolls",
              "enabled": true,
              "type": "CALL",
              "created": "2019-10-08T15:01:03+00:00",
              "modified": "2019-10-08T15:09:59+00:00"
          },
          {
              "id": 6895,
              "name": "Greg's Call Queue Test",
              "enabled": true,
              "type": "CALL",
              "created": "2019-10-09T08:49:26+00:00",
              "modified": "2019-10-09T08:25:04+00:00"
          },
          {
              "id": 6898,
              "name": "__User:6516:Neil Burgess",
              "enabled": true,
              "type": "CALL",
              "created": "2019-10-22T12:30:11+00:00",
              "modified": "2019-11-05T12:51:40+00:00"
          },
          {
              "id": 6900,
              "name": "Freedom Mobile Test",
              "enabled": true,
              "type": "CALL",
              "created": "2019-10-23T10:34:38+00:00",
              "modified": "2019-10-31T12:46:13+00:00"
          },
          {
              "id": 6925,
              "name": "FreedomMobileTestQA",
              "enabled": true,
              "type": "CALL",
              "created": "2019-11-04T11:58:18+00:00",
              "modified": "2019-11-05T12:42:50+00:00"
          },
          {
              "id": 6927,
              "name": "__User:8213:alvaro chatter",
              "enabled": true,
              "type": "CALL",
              "created": "2019-11-05T10:04:33+00:00",
              "modified": "2019-11-19T09:54:16+00:00"
          },
          {
              "id": 7007,
              "name": "__User:8259:Cats StageChatter",
              "enabled": true,
              "type": "CALL",
              "created": "2019-12-10T15:58:13+00:00",
              "modified": "2019-12-10T15:58:13+00:00"
          },
          {
              "id": 7060,
              "name": "yep",
              "enabled": true,
              "type": "CALL",
              "created": "2020-01-09T15:17:08+00:00",
              "modified": "2020-01-09T15:17:08+00:00"
          },
          {
              "id": 7084,
              "name": "__User:8290:Haider Mahmood",
              "enabled": true,
              "type": "CALL",
              "created": "2020-01-15T11:05:43+00:00",
              "modified": "2020-06-04T14:31:18+00:00"
          },
          {
              "id": 7086,
              "name": "__User:7657:Greg Inglis",
              "enabled": true,
              "type": "CALL",
              "created": "2020-01-16T15:40:20+00:00",
              "modified": "2020-01-16T15:40:20+00:00"
          },
          {
              "id": 7088,
              "name": "Haider Mahmood Policy Call",
              "enabled": true,
              "type": "CALL",
              "created": "2020-01-17T16:30:50+00:00",
              "modified": "2020-04-30T11:14:55+00:00"
          },
          {
              "id": 7100,
              "name": "__User:8067:Aditya Vijay",
              "enabled": true,
              "type": "CALL",
              "created": "2020-01-21T17:04:50+00:00",
              "modified": "2020-06-11T09:43:27+00:00"
          },
          {
              "id": 7124,
              "name": "NcTriggerLiam",
              "enabled": true,
              "type": "NON_CALL",
              "created": "2020-02-06T14:51:15+00:00",
              "modified": "2020-02-06T14:59:59+00:00"
          },
          {
              "id": 7126,
              "name": "Greg Switchboard Ext Test",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-06T14:55:07+00:00",
              "modified": "2020-02-06T15:05:03+00:00"
          },
          {
              "id": 7129,
              "name": "__User:8311:Haider Chatterfree",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-11T11:59:32+00:00",
              "modified": "2020-02-11T11:59:32+00:00"
          },
          {
              "id": 7139,
              "name": "adi",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-17T11:49:04+00:00",
              "modified": "2020-02-17T11:49:04+00:00"
          },
          {
              "id": 7159,
              "name": "adi zoiper",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-20T16:51:57+00:00",
              "modified": "2020-02-21T11:06:33+00:00"
          },
          {
              "id": 7185,
              "name": "(Actual) external inbound policy",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-21T10:32:36+00:00",
              "modified": "2020-02-21T10:37:22+00:00"
          },
          {
              "id": 7289,
              "name": "__User:8304:Haider Test",
              "enabled": true,
              "type": "CALL",
              "created": "2020-02-26T10:04:05+00:00",
              "modified": "2020-02-26T10:04:05+00:00"
          },
          {
              "id": 7363,
              "name": "__User:7253:Jim Page",
              "enabled": true,
              "type": "CALL",
              "created": "2020-03-03T13:33:48+00:00",
              "modified": "2020-03-03T13:33:48+00:00"
          },
          {
              "id": 7381,
              "name": "vm Abi",
              "enabled": true,
              "type": "CALL",
              "created": "2020-03-10T10:34:53+00:00",
              "modified": "2020-03-10T10:34:53+00:00"
          },
          {
              "id": 7615,
              "name": "Chris Wilmott",
              "enabled": true,
              "type": "CALL",
              "created": "2020-04-23T14:39:08+00:00",
              "modified": "2020-04-23T13:44:00+00:00"
          },
          {
              "id": 7619,
              "name": "__User:8143:test & one",
              "enabled": true,
              "type": "CALL",
              "created": "2020-04-29T10:49:14+00:00",
              "modified": "2020-04-29T09:49:24+00:00"
          },
          {
              "id": 7679,
              "name": "Connect Things",
              "enabled": true,
              "type": "CALL",
              "created": "2020-05-04T15:36:03+00:00",
              "modified": "2020-05-04T14:48:14+00:00"
          },
          {
              "id": 8188,
              "name": "PLAT-21950 policy to replicate pbx load",
              "enabled": true,
              "type": "CALL",
              "created": "2020-06-10T12:25:53+00:00",
              "modified": "2020-06-10T11:40:32+00:00"
          },
          {
              "id": 8378,
              "name": "Empty Policy Test",
              "enabled": true,
              "type": "CALL",
              "created": "2020-06-19T14:25:33+00:00",
              "modified": "2020-06-19T13:25:33+00:00"
          }
      ]
  }