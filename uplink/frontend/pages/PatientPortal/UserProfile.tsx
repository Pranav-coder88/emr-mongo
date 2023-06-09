import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    Text,
    useColorModeValue,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import *as React from 'react';
import {SyntheticEvent, useState} from 'react';
import NavBar from "../Props-TypeScript/NavBar"
import Cookie from "../Props-TypeScript/Cookie";
import SideDrawer from "../Props-TypeScript/SideDrawer";

export default function UserProfile() {

    const url = 'http://localhost:3000/api/getUserDetails'
    let {
        name,
        birthdate,
        age,
        gender,
        modeOfReach,
        symptomsBrief,
        prevPractitioners,
        psychHospitalizations,
        statusECT,
        statusPsychotherapy,
        email,

    } = Cookie(url);


    const [CreatedDate, setCreatedDate] = useState(''),
        [Name, setName] = useState(''),
        [Age, setAge] = useState(''),
        [Gender, setGender] = useState(''),
        [ModeOfReach, setModeOfReach] = useState(''),
        [SymptomsBrief, setSymptomsBrief] = useState(''),
        [PrevPractitioners, setPrevPractitioners] = useState(''),
        [PsychHospitalizations, setPsychHospitalizations] = useState(''),
        [StatusECT, setStatusECT] = useState(''),
        [StatusPsychotherapy, setStatusPsychotherapy] = useState(''),
        [Birthday, setBirthday] = useState(''),
        toast = useToast();


    let
        Toast

    let [inputDisabled, isInputDisabled] = useState(true);
    let [buttonData, setButtonData] = useState('Update details');
    const bgColor = useColorModeValue('gray.200', 'gray.700');


    const updateDetails = () => {

        if (inputDisabled === true) {
            isInputDisabled(false);
            setButtonData('Submit');
        } else {
            isInputDisabled(true);
            setButtonData('Update details');
        }
    }
    // @ts-ignore
    const submit = async (e: SyntheticEvent) => {

        e.preventDefault();

        if (inputDisabled === true) {



            const response = await fetch('http://localhost:3000/api/updateUserDetails', {
                body: JSON.stringify({
                    CreatedDate,
                    Name,
                    Birthday,
                    Age,
                    Gender,
                    ModeOfReach,
                    SymptomsBrief,
                    PrevPractitioners,
                    PsychHospitalizations,
                    StatusECT,
                    StatusPsychotherapy,

                    }
                ),
                // credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            });

            //
            if (response.status === 200) {

                Toast = (toast({
                    title: 'Everything worked',
                    description: 'Account Details are updated',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                }))


            } else if (response.status === 400) {

                Toast = (toast({
                    title: 'Error',
                    description: 'Something went wrong , please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                }))
            }

        }
    }


    return (

        <>
            <NavBar mode='patient' name={'name'}/>
            <SideDrawer mode='patient'/>
            <Container maxW='container.xl' px={5} py={2}>
                <Container maxW='container.lg' py={35} px={100}>
                    <Card bg={bgColor} p={15}>

                        <Wrap spacing={5}>

                            <WrapItem>


                                <Box maxW='full'>
                                    <Heading mb={4}>Update your profile</Heading>
                                    <Text fontSize='lg'>
                                        Keep your profile up to date so your doctors can get to know more about your
                                        ailments
                                        and help you out even faster.
                                    </Text>
                                </Box>

                            </WrapItem>


                            <Divider w={'full'}/>


                            <WrapItem>

                                <SimpleGrid spacing={3} columns={2} columnGap={45}>
                                    <GridItem colSpan={1}>
                                        <Flex>
                                            <form onSubmit={submit}>
                                                <FormControl isDisabled={inputDisabled}>
                                                    <SimpleGrid p={2} columnGap={5} rowGap={5} columns={2}>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Name</FormLabel>
                                                            <Input type='text' defaultValue={name}
                                                                   onChange={e => setName(e.target.value)}/>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Email address</FormLabel>
                                                            <Input type='email' defaultValue={email}
                                                            />
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Age</FormLabel>
                                                            <Input type='number' defaultValue={age}
                                                                   onChange={e => setAge(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Date of Birth</FormLabel>
                                                            <Input type='text' defaultValue={Birthday}
                                                                   onChange={e => setBirthday(e.target.value)}/>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Gender</FormLabel>
                                                            <Input type='text' defaultValue={gender}
                                                                   onChange={e => setGender(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Mode Of Reach</FormLabel>
                                                            <Input type='text' defaultValue={modeOfReach}
                                                                   onChange={e => setModeOfReach(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Ailments</FormLabel>
                                                            <Input type='text' defaultValue={symptomsBrief}

                                                                   onChange={e => setSymptomsBrief(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Prev Practitioners</FormLabel>
                                                            <Input type='text' defaultValue={prevPractitioners}

                                                                   onChange={e => setPrevPractitioners(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>Psych Hospitalizations</FormLabel>
                                                            <Input type='text' defaultValue={psychHospitalizations}
                                                                   onChange={e => setPsychHospitalizations(e.target.value)}/>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel>ECT Status</FormLabel>
                                                            <Input type='text' defaultValue={statusECT}
                                                                   onChange={e => setStatusECT(e.target.value)}/>
                                                        </GridItem><

                                                        GridItem colSpan={2}>
                                                        <FormLabel>Psychotherapy Status </FormLabel>
                                                        <Input type='text' defaultValue={statusPsychotherapy}
                                                               onChange={e => setStatusPsychotherapy(e.target.value)}/>
                                                    </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <Button size='md' w='full' colorScheme='brand' type='submit'
                                                                    onClick={updateDetails}> {buttonData} </Button>
                                                        </GridItem>


                                                    </SimpleGrid>
                                                </FormControl>
                                            </form>

                                        </Flex>
                                    </GridItem>


                                    <GridItem colSpan={1}>
                                        <Container maxW='container.xl' mx={30}>
                                            <Flex>
                                                <Divider h='500' orientation='vertical'/>


                                                <VStack align={'center'} mx={75}>

                                                    <WrapItem>
                                                        <Avatar size='xl' name='Christian Nwamba'
                                                                src='https://bit.ly/code-beast'/>{' '}
                                                    </WrapItem>
                                                    <Text>{name}</Text>
                                                    <Text>{email}</Text>
                                                    <Divider orientation='horizontal' w={100}/>
                                                    <Button py={4} size='md' w='full' colorScheme='brand'>
                                                        Generate Report
                                                    </Button>

                                                </VStack>
                                            </Flex>
                                        </Container>


                                    </GridItem>

                                </SimpleGrid>
                            </WrapItem>


                        </Wrap>
                    </Card>

                </Container>
            </Container>

        </>

    )
        ;
}