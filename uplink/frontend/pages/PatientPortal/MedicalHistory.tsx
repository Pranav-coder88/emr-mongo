/*

Author : Pranav
Created on : 27-03-2023
IDE : GoLand

*/

import * as React from 'react';
import {SyntheticEvent, useState} from 'react';
import {
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    Container,
    Divider,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react";
import SideDrawer from "../Props-TypeScript/SideDrawer";
import NavBar from "../Props-TypeScript/NavBar";
import Cookie from "../Props-TypeScript/Cookie";
import SubStanceInfo from "../Props-TypeScript/SubStanceInfo";
import FamilyDetails from "../Props-TypeScript/FamilyDetails";

interface CheckboxItem {
    value: string;
    isChecked: boolean;
}


const MedicalHistory = () => {


    const url = 'http://localhost:3000/api/user'
    let {name: name} = Cookie(url);
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');

    let [formData, setFormData] = useState({
        RecentWeightGain: "",
        JointSwelling: "",
        OtherProblems: "",
})

    const [checkedItemsForPastMedicalHistory, setCheckedItemsForPastMedicalHistory] = useState<CheckboxItem[]>([]);
    const [checkedItemsForPersonalHistory, setCheckedItemsForPersonalHistory] = useState<CheckboxItem[]>([]);
    const [checkedItemsForSystemReview, setCheckedItemsForSystemReview] = useState<CheckboxItem[]>([]);


     /*
     TODO:
         1.Add material status data to the EMR object
         2.Add ui and backend for multiple children , sibling and all the properties which require an []
         3.Sort out Current Medications panel
      */


    const [BirthProblems, setBirthProblems] = useState(''),
        [PlaceOfBirth, setPlaceOfBirth] = useState(''),
        //[MaritalStatus, setMaritalStatus] = useState(''),
        [LatestOccupation, setLatestOccupation] = useState(''),
        [HoursPerWeek, setHoursPerWeek] = useState(''),
        [DescSSI, setDescSSI] = useState(''),
        [LegalProblems, setLegalProblems] = useState(''),
        [Religion, setReligion] = useState('');

    let pastMedicalHistory;
    let personalHistory;
    let systemReview;

    /*Will show an alert if the page is going to be refreshed as the data might not have been submitted */
    //const [showAlert, setShowAlert] = useState(false);

    // useEffect(() => {
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         event.preventDefault();
    //         event.returnValue = "";
    //         setShowAlert(true);
    //     };
    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);
    //
    // const handleClose = () => {
    //     setShowAlert(false);
    // };


    const handleCheckboxChangeForPastMedicalHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;

        const newItems = checkedItemsForPastMedicalHistory.map((item) =>
            item.value === value ? {...item, isChecked: checked} : item
        );

        if (!newItems.some((item) => item.value === value)) {
            newItems.push({value, isChecked: checked});
        }

        setCheckedItemsForPastMedicalHistory(newItems);


    };


    const handleInputChangeForSystemReview = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleCheckboxChangeForSystemReview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;

        const newItems = checkedItemsForSystemReview.map((item) =>
            item.value === value ? {...item, isChecked: checked} : item
        );

        if (!newItems.some((item) => item.value === value)) {
            newItems.push({value, isChecked: checked});
        }

        setCheckedItemsForSystemReview(newItems);

    };

    const handleCheckboxChangeForPersonalHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;

        const newItems = checkedItemsForPersonalHistory.map((item) =>
            item.value === value ? {...item, isChecked: checked} : item
        );

        if (!newItems.some((item) => item.value === value)) {
            newItems.push({value, isChecked: checked});
        }

        setCheckedItemsForPersonalHistory(newItems);


    };

    const [FamilyHistory, setPatientFamilyDetails] = useState({});


    const handleClick = obj => {
        setPatientFamilyDetails(emp => ({...emp, ...obj}));
    }


    // @ts-ignore
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        pastMedicalHistory = checkedItemsForPastMedicalHistory.reduce((obj, item) => {
            obj[item.value] = item.isChecked;
            return obj;
        }, {});

        personalHistory = checkedItemsForPersonalHistory.reduce((obj, item) => {

            obj[item.value] = item.isChecked;
            return obj;
        }, {});

        systemReview = checkedItemsForSystemReview.reduce((obj, item) => {

            obj[item.value] = item.isChecked;
            return obj;
        }, {});



        // setCheckedItemsForSystemReview({RecentWeightGain:recentWeightGain})

        // systemReview = checkedItemsForSystemReview.reduce((obj, item) => {
        //     obj[item.value] = item.isChecked;
        //     return obj;
        // }, {});



        formData = {
            ...formData,
            ...systemReview,
        };

        const emrData = {
            // CurrentMedications: currentMedications,
            PastMedicalHistory: pastMedicalHistory,
            PersonalHistory: {
                BirthProblems: BirthProblems,
                PlaceOfBirth: PlaceOfBirth,
                //MaritalStatus: MaritalStatus,
                LatestOccupation: LatestOccupation,
                StatusWorking: personalHistory.StatusWorking,
                HoursPerWeek: HoursPerWeek,
                StatusSSI: personalHistory.StatusSSI,
                DescSSI: DescSSI,
                LegalProblems: LegalProblems,
                Religion: Religion,
            },
            FamilyHistory,
            SystemsReview: {
                PreviousSymptoms: formData
            },
            // SubstanceUse:substanceUse,
        }

        console.log(emrData);


        // console.log(formData)
        // console.log('Selected checkboxes:', checkboxValues);

    };


    return (
        <>
            {/*{showAlert && (*/}
            {/*    <Alert status="warning">*/}
            {/*        <AlertIcon/>*/}
            {/*        Are you sure you want to leave this page? All unsaved changes will be lost.*/}
            {/*        <CloseButton position="absolute" right="8px" top="8px" onClick={handleClose}/>*/}
            {/*    </Alert>*/}
            {/*)}*/}


            <NavBar mode='patient' name={name}/>

            <SideDrawer mode='patient'/>


            <Container maxW='container.xl' p={5} centerContent>


                <Card p={5} bg={bgColor}>

                    <Heading>Medical History</Heading>
                    <Text py={5}>Update your Medical Details !!</Text>

                    <Tabs>
                        <TabList>
                            <Tab>Current Medications</Tab>
                            <Tab>Medical History</Tab>
                            <Tab>Personal History</Tab>
                            <Tab>Family History</Tab>
                            <Tab>Health Review</Tab>
                            <Tab>Substance Use</Tab>
                        </TabList>
                        <Divider/>
                        <TabPanels>


                            {/*Current Medication*/}
                            <TabPanel>
                                <FormControl display='flex' alignItems='center'>

                                    <SimpleGrid columns={1} spacing={5}>

                                        <GridItem>

                                            <FormLabel>Drug Allergies</FormLabel>
                                            <Input my={3} variant='outline' placeholder='e.g: Skin Rash'/>
                                        </GridItem>
                                        <GridItem>

                                            <FormLabel>Medications</FormLabel>
                                            <Input my={3} variant='outline' placeholder='e.g: Insulin'/>
                                        </GridItem>
                                    </SimpleGrid>
                                </FormControl>


                            </TabPanel>

                            {/*PastMedicalHistory*/}
                            <TabPanel>
                                <form onSubmit={handleSubmit}>

                                    <FormControl display='flex' alignItems='center'>

                                        <SimpleGrid columns={1} spacing={5}>

                                            <GridItem>

                                                <CheckboxGroup colorScheme='green'>
                                                    <Stack spacing={[10, 10]} direction={['column', 'row']}>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Diabetes'>Diabetes</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='HighBloodPressure'>High Blood
                                                            Pressure</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='HighCholesterol'>High Cholesterol</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Hypothyroidism '>Hypothyroidism </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Goiter'>Goiter </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Hepatitis'>Hepatitis</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Leukemia'>Leukemia </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Psoriasis'>Psoriasis </Checkbox>

                                                    </Stack>
                                                </CheckboxGroup>

                                            </GridItem>
                                            <GridItem my={3}>

                                                <CheckboxGroup colorScheme='green'>
                                                    <Stack spacing={[10, 10]} direction={['column', 'row']}>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Angina'>Angina </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='HeartProblems'>Heart
                                                            Problems</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='HeartMurmur'>Heart
                                                            Murmur</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Pneumonia'>Pneumonia</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='PulmonaryEmbolism'>Pulmonary
                                                            Embolism</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Asthma'>Asthma</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Emphysema'>Emphysema</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Stroke'>Stroke</Checkbox>
                                                    </Stack>
                                                </CheckboxGroup>

                                            </GridItem>

                                            <GridItem my={3}>

                                                <CheckboxGroup colorScheme='green'>
                                                    <Stack spacing={[10, 10]} direction={['column', 'row']}>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Epilepsy'>Epilepsy </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Cataracts'>Cataracts </Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='KidneyDisease'>Kidney
                                                            Disease</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='KidneyStones'>Kidney
                                                            Stones</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='CrohnsDisease'>Crohns
                                                            Disease</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Colitis'>Colitis</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Anemia'>Anemia</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Jaundice'>Jaundice</Checkbox>

                                                    </Stack>
                                                </CheckboxGroup>

                                            </GridItem>
                                            <GridItem my={3}>

                                                <CheckboxGroup colorScheme='green'>
                                                    <Stack spacing={[10, 10]} direction={['column', 'row']}>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='PepticUlcer'>Peptic
                                                            Ulcer</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='RheumaticFever'>Rheumatic Fever</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Tuberculosis'>Tuberculosis</Checkbox>
                                                        <Checkbox onChange={handleCheckboxChangeForPastMedicalHistory}
                                                                  value='Aids'>Aids</Checkbox>


                                                    </Stack>
                                                </CheckboxGroup>

                                            </GridItem>

                                        </SimpleGrid>
                                    </FormControl>
                                </form>


                            </TabPanel>


                            {/*PersonalHistory */}
                            <TabPanel>

                                <form onSubmit={handleSubmit}>

                                    <FormControl display='flex' alignItems='center'>

                                        <SimpleGrid columns={3} spacing={5}>

                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>Problems During Birth</FormLabel>
                                                <Input onChange={e => setBirthProblems(e.target.value)} my={3}
                                                       variant='outline' placeholder='e.g: Heart Defects'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>Place Of Birth</FormLabel>
                                                <Input my={3} onChange={e => setPlaceOfBirth(e.target.value)}
                                                       variant='outline' placeholder='e.g: New York'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>MaritalStatus</FormLabel>
                                                <Select variant='filled' my={5}>
                                                    <option value='Married'>Married</option>
                                                    <option value='Single'>Single</option>
                                                </Select>

                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>Current Occupation</FormLabel>
                                                <Input my={3} onChange={e => setLatestOccupation(e.target.value)}
                                                       variant='outline' placeholder='e.g: Tesla CEO'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>How many hours per Week do you work ?</FormLabel>
                                                <Input my={3} onChange={e => setHoursPerWeek(e.target.value)}
                                                       variant='outline' placeholder='e.g: 96'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>Religion</FormLabel>
                                                <Input my={3} onChange={e => setReligion(e.target.value)}
                                                       variant='outline' placeholder='e.g: Atheist'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>SSI description</FormLabel>
                                                <Input my={3} onChange={e => setDescSSI(e.target.value)}
                                                       variant='outline' placeholder='e.g: Atheist'/>
                                            </GridItem>
                                            <GridItem mx={3} colSpan={1}>

                                                <FormLabel>Legal Problems ?</FormLabel>
                                                <Input my={3} onChange={e => setLegalProblems(e.target.value)}
                                                       variant='outline' placeholder='e.g: Crime'/>

                                            </GridItem>

                                            <GridItem mx={3} my={6} colSpan={1}>
                                                <Checkbox onChange={handleCheckboxChangeForPersonalHistory}
                                                          colorScheme='green' value='StatusSSI'>
                                                    StatusSSI ?
                                                </Checkbox>
                                            </GridItem>

                                            <GridItem mx={3} colSpan={1}>
                                                <Checkbox onChange={handleCheckboxChangeForPersonalHistory}
                                                          colorScheme='green' value='StatusWorking'>
                                                    Currently employed ?
                                                </Checkbox>
                                            </GridItem>


                                        </SimpleGrid>
                                    </FormControl>
                                </form>


                            </TabPanel>


                            {/*FamilyHistory */}
                            <TabPanel>

                                <Tabs
                                    orientation="vertical"
                                    size="md"
                                    colorScheme="green"
                                >

                                    <TabList>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Father</Tab>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Mother</Tab>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Siblings</Tab>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Children</Tab>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Maternal Relative
                                            Issues</Tab>
                                        <Tab _focus={{outline: "none"}} fontWeight="semibold">Paternal Relative
                                            Issues</Tab>
                                    </TabList>
                                    <TabPanels>

                                        {/*Father*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Father'} handleClick={handleClick}/>

                                        </TabPanel>

                                        {/*Mother*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Mother'} handleClick={handleClick}/>


                                        </TabPanel>

                                        {/*Siblings*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Sibling'} handleClick={handleClick}/>


                                        </TabPanel>

                                        {/*Children*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Children'} handleClick={handleClick}/>


                                        </TabPanel>

                                        {/*Maternal Relative Issues*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Maternal Relative Issues'} handleClick={handleClick}/>


                                        </TabPanel>

                                        {/*Paternal Relative Issues*/}
                                        <TabPanel>

                                            <FamilyDetails mode={'Paternal Relative Issues'} handleClick={handleClick}/>

                                        </TabPanel>


                                    </TabPanels>

                                </Tabs>
                            </TabPanel>

                            {/*SystemsReview */}
                            <TabPanel>
                                <form onSubmit={handleSubmit}>


                                    <Tabs
                                        orientation="vertical"
                                        size="md"
                                        colorScheme="green"
                                    >
                                        <TabList>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">General</Tab>
                                            <Tab _focus={{outline: "none"}}
                                                 fontWeight="semibold">Muscle/Joints/Bones</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Ears</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Eyes</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Throat</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Heart and Lungs</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Nervous System</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Stomach and
                                                Intestines</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Skin</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Blood</Tab>
                                            <Tab _focus={{outline: "none"}}
                                                 fontWeight="semibold">Kidney/Urine/Bladder</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Women Only</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Psychiatric</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Other</Tab>
                                        </TabList>
                                        <TabPanels>

                                            {/*General*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='Fatigue'>
                                                                Do you feel any fatigue ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='Weakness'>
                                                                Do you feel any weakness ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='Fever'>
                                                                Do you have a fever ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Input my={3} variant='outline'
                                                                   name='RecentWeightGain'
                                                                   onChange={handleInputChangeForSystemReview}
                                                                   placeholder='Did you have any recent weight gain ?'/>
                                                        </GridItem>
                                                        <GridItem mx={3} my={5} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='NightSweats'>Do you
                                                                have
                                                                NightSweats?</Checkbox>
                                                        </GridItem>


                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Muscle/Joints/Bones*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='Numbness'>
                                                                Do you feel any Numbness ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='JointPain'>
                                                                Do you feel any Joint Pain ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}
                                                                      colorScheme='green' value='MuscleWeakness'>
                                                                Do you have a Muscle Weakness ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Input my={3} variant='outline' name='JointSwelling' onChange={handleInputChangeForSystemReview}
                                                                   placeholder='Do you have any Joint Swelling ?'/>
                                                        </GridItem>


                                                    </SimpleGrid>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Ears*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='RingingInEars'>
                                                                Do you feel any Ringing In Ears ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='LossOfHearing'>
                                                                Do you feel any Loss Of Hearing ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Eyes*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='EyePain'>
                                                                Do you feel any Eye Pain ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='EyeRedness'>
                                                                Do you have any Eye Redness ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='LossOfVision'>
                                                                Do you have any Loss Of Vision ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='BlurredVision'>
                                                                Do you have any Blur of Vision ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='EyeDryness'>
                                                                Do you have any Dryness of the eye ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Throat*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='FrequentSoreThroats'>
                                                                Do you get frequent sore throats ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='ThroatHoarseness'>
                                                                Do you any strain in the throat?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='PainInJaw'>
                                                                Do you have any pain in jaw ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green'
                                                                      value='DifficultyInSwallowing'>
                                                                Do you have any difficulty in swallowing ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Heart and Lungs*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview}  colorScheme='green' value='ChestPain'>
                                                                Do you have/get any chest pain ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Palpitations'>
                                                                Do you get palpitations?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='ShortnessOfBreath'>
                                                                Do you feel shortness of breath ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Fainting'>
                                                                Do you fell like you will faint ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='SwollenLegsOrFeet'>
                                                                Do you have swollen legs or feet?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Cough'>
                                                                Do you cough ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>


                                            </TabPanel>

                                            {/*Nervous System*/}
                                            <TabPanel>


                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Nausea'>
                                                                Do you get frequent Nausea?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Dizziness'>
                                                                Do you get any Dizziness ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='LossOfConsciousness'>
                                                                Any recent loss of consciousness?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Tingling'>
                                                                Any tingling sensation ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='MemoryLoss'>
                                                                Any memory loss ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Stomach and intestines*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Headaches'>
                                                                Do you get frequent Headaches ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Heartburn'>
                                                                Do you get any Heart burn ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='StomachPain'>
                                                                Do you get frequent Stomach Pain ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Vomiting'>
                                                                Do you get frequent Vomiting ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='YellowJaundice'>
                                                                Do you get frequent Yellow Jaundice ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green'
                                                                      value='IncreasingConstipation'>
                                                                Do you have frequent Increasing Constipation ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='PersistentDiarrhea'>
                                                                Do you get Persistent Diarrhea ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='BloodInStools'>
                                                                Do you get frequent Blood In Stools ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='BlackStools'>
                                                                Do you have Black Stools ?
                                                            </Checkbox>
                                                        </GridItem>

                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Skin*/}
                                            <TabPanel>


                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='SkinRedness'>
                                                                Do you get frequent Skin Redness?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Rash'>
                                                                Do you get frequent Rashes ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Bumps'>
                                                                Any skin bumps?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='HairLoss'>
                                                                Any Hair Loss ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='ColorChanges'>
                                                                Any skin Color Changes ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Blood*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Anemia'>
                                                                Do you have Anemia?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={2}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Clots'>
                                                                Do you get any Clots ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Kidney/Urine/Bladder*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='FrequentUrination'>
                                                                Do you get frequently urinate ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={2}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='BloodInUrine'>
                                                                Do you get any blood in your Urine ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Women Only*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <FormLabel>What was you age when you had your first periods
                                                                ?</FormLabel>
                                                            <Input my={3} variant='outline' placeholder='e.g: 15'/>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <FormLabel>How many times were you pregnant ?</FormLabel>
                                                            <Input my={3} variant='outline' placeholder='e.g: 1'/>
                                                        </GridItem>
                                                        <GridItem mx={3} my={0} colSpan={1}>
                                                            <FormLabel>Number of Miscarriages ?</FormLabel>
                                                            <Input my={3} variant='outline' placeholder='e.g: 0'/>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <FormLabel>Number of Abortions ?</FormLabel>
                                                            <Input my={3} variant='outline'
                                                                   placeholder='e.g: Heart Attack'/>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <FormLabel>Meno Pause Age?</FormLabel>
                                                            <Input my={3} variant='outline' placeholder='e.g: 60'/>
                                                        </GridItem>
                                                        <GridItem m={10} colSpan={1}>
                                                            <Checkbox colorScheme='green' value='NightSweats '>Do you
                                                                have
                                                                Regular
                                                                Periods?</Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox colorScheme='green' value='AbnormalPapSmear'>
                                                                Do you get abnormal pap smear?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox colorScheme='green' value='IrregularPeriods'>
                                                                Do you have irregular periods?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox colorScheme='green'
                                                                      value='BleedingBetweenPeriods'>
                                                                Any bleeding between periods?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox colorScheme='green' value='Pms'>
                                                                Do you have PMS ?
                                                            </Checkbox>
                                                        </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Psychiatric*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>

                                                    <SimpleGrid columns={3} spacing={5}>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Depression'>
                                                                Do you have Depression ?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='ExcessiveWorries'>
                                                                Do you Worry Excessively?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green'
                                                                      value='DifficultyFallingAsleep'>
                                                                Do you have difficulty falling asleep?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green'
                                                                      value='DifficultyStayingAsleep'>
                                                                Do you have difficulty staying asleep?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green'
                                                                      value='DifficultiesWithSexualArousal'>
                                                                Any difficulties with sexual arousal?
                                                            </Checkbox>
                                                        </GridItem>
                                                        <GridItem mx={3} colSpan={1}>
                                                            <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='PoorAppetite'>
                                                                Do you have Poor Appetite?
                                                            </Checkbox>
                                                        </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='FoodCravings'>
                                                            Any food cravings?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='FrequentCrying'>
                                                            Do you cry frequently?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Sensitivity'>
                                                            Are you highly sensitive?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='SuicidalThoughts'>
                                                            Do you get Suicidal Thoughts?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Stress'>
                                                            Any excess stress?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Irritability'>
                                                            Low Iritation tolerance?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='PoorConcentration'>
                                                            Do you have poor concentration?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='RacingThoughts'>
                                                            Do you get any racing thoughts?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Hallucinations'>
                                                            Any hallucinations?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='GuiltyThoughts'>
                                                            Any Guilty Thoughts?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='Paranoia'>
                                                            Do you get any Paranoia?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='RapidSpeech'>
                                                            Any Rapid Speech problems?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='MoodSwings'>
                                                            Any Mood Swings?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox colorScheme='green' value='Anxiety'>
                                                            Do you fell Anxious?
                                                        </Checkbox>
                                                    </GridItem><GridItem mx={3} colSpan={1}>
                                                        <Checkbox onChange={handleCheckboxChangeForSystemReview} colorScheme='green' value='RiskyBehavior'>
                                                            Any Risky Behavior?
                                                        </Checkbox>
                                                    </GridItem>
                                                    </SimpleGrid>
                                                </FormControl>


                                            </TabPanel>

                                            {/*Other*/}
                                            <TabPanel>

                                                <FormLabel>Any other health problems ?</FormLabel>
                                                <Textarea h={250}/>

                                            </TabPanel>

                                        </TabPanels>
                                    </Tabs>
                                    <Button my={5} w='full' type="submit">Submit</Button>

                                </form>
                            </TabPanel>

                            {/*SubstanceUse*/}
                            <TabPanel>

                                <form onSubmit={handleSubmit}>

                                    <Tabs
                                        orientation="vertical"
                                        size="md"
                                        colorScheme="green"
                                    >

                                        <TabList>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Alcohol</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Cannabis</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Stimulants A</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Stimulants B</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Amphetamines</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Tranquilizers</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Sedatives</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Heroin</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Illicit
                                                Methadone</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Other Opioids</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Hallucinogens</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Inhalants</Tab>
                                            <Tab _focus={{outline: "none"}} fontWeight="semibold">Other</Tab>
                                        </TabList>
                                        <TabPanels>

                                            {/*Alcohol*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Alcohol'/>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Cannabis*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Cannabis'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Stimulants A*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Stimulants A'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Stimulants B*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Stimulants B'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Amphetamines*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Amphetamines'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Tranquilizers*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Tranquilizers'/>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Sedatives*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Sedatives'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*Heroin*/}
                                            <TabPanel>
                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Heroin'/>
                                                </FormControl>
                                            </TabPanel>

                                            {/*IllicitMethadone*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Illicit Methadone'/>
                                                </FormControl>

                                            </TabPanel>

                                            {/*OtherOpioids*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Other Opioids'/>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Hallucinogens*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Hallucinogens'/>
                                                </FormControl>

                                            </TabPanel>

                                            {/*Inhalants*/}
                                            <TabPanel>

                                                <FormControl display='flex' alignItems='center'>
                                                    <SubStanceInfo substance='Inhalants'/>
                                                </FormControl>

                                            </TabPanel>


                                            {/*Other*/}
                                            <TabPanel>

                                                <FormLabel>Any other Substance addiction ?</FormLabel>
                                                <Textarea h={250}/>


                                            </TabPanel>


                                        </TabPanels>

                                    </Tabs>

                                    <Button my={5} w='full' type="submit">Submit</Button>
                                </form>

                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Card>
            </Container>


        </>
    )
        ;
};

export default MedicalHistory;