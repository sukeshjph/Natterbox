export default {
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