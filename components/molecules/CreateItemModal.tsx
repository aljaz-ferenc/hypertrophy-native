import {
    Checkbox,
    Divider,
    FlatList,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    Text,
    View,
    VStack
} from "native-base";
import {useState} from "react";
import {StyleSheet} from "react-native";
import Button from "@/components/atoms/Button";
import FormErrorMessage from "@/components/atoms/FormErrorMessage";
import {Colors} from "@/constants/Colors";
import useUserStore from '@/store/user.store'
import {FoodItem, Portion} from "@/types";
import useCreateFoodItem from "@/api/queries/useCreateFoodItem";
import * as Crypto from 'expo-crypto'

type CreateItemModalProps = {
    isOpen: boolean,
    onClose: () => void
}

type Errors = Partial<{
    name: string,
    calories: string,
    protein: string,
    fat: string,
    carbs: string
}>


export default function CreateItemModal({isOpen, onClose}: CreateItemModalProps) {
    const [modalVisible, setModalVisible] = useState(isOpen)
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [protein, setProtein] = useState('')
    const [fat, setFat] = useState('')
    const [carbs, setCarbs] = useState('')
    const [errors, setErrors] = useState<Partial<Errors>>({})
    const userId = useUserStore(state => state.user?._id)
    const {mutateAsync, error, isLoading} = useCreateFoodItem()
    const [portions, setPortions] = useState<Portion[]>([])
    const [saveitem, setSaveItem] = useState(false)
    const createItem = async () => {
        if (!userId) return;

        const errors: Errors = {}

        if (!name) {
            errors.name = 'Required'
        }
        if (!calories) {
            errors.calories = 'Required'
        }
        if (!protein) {
            errors.protein = 'Required'
        }
        if (!carbs) {
            errors.carbs = 'Required'
        }
        if (!fat) {
            errors.fat = 'Required'
        }
        if (!!Object.keys(errors).length) {
            setErrors(errors)
            return
        }

        const newItem: FoodItem = {
            name,
            calories: +calories,
            protein: +calories,
            fat: +fat,
            carbs: +carbs,
            user: userId,
            portions
        }

        console.log(newItem)

        try {
            const res = await mutateAsync(newItem)
            console.log(res)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message)
                return
            }
            console.log(err)
        }
    }

    const updatePortionTitle = (portion: Portion, val: string) => {
        setPortions(prev => {
            return prev.map(p => {
                if (p.id === portion.id) {
                    return {...p, title: val}
                }
                return p
            })
        })
    }

    const updatePortionAmount = (portion: Portion, val: string) => {
        setPortions(prev => {
            return prev.map(p => {
                if (p.id === portion.id) {
                    return {...p, amount: val}
                }
                return p
            })
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <Modal.Content height={'500'}>
                <Modal.CloseButton/>
                <Modal.Header>
                    Create New Item
                    <Text style={{marginTop: 3, color: Colors.textGray}}>New item will be available to select from the
                        "Select item" dropdown.</Text>
                </Modal.Header>
                <Modal.Body style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View style={styles.inputsContainer}>
                        <VStack space={5}>
                            <View>
                                <Input type={'text'} keyboardType={'default'} placeholder={'Name...'}
                                       onChangeText={setName}/>
                                <FormErrorMessage message={errors.name}/>
                            </View>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text>Calories: </Text>
                                    <InputGroup>
                                        <Input type={'text'} keyboardType={'numeric'} onChangeText={setCalories}/>
                                        <InputRightAddon>g</InputRightAddon>
                                    </InputGroup>
                                </View>
                                <FormErrorMessage message={errors.calories}/>
                            </View>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text>Protein: </Text>
                                    <InputGroup>
                                        <Input type={'text'} keyboardType={'numeric'} onChangeText={setProtein}/>
                                        <InputRightAddon>g</InputRightAddon>
                                    </InputGroup>
                                </View>
                                <FormErrorMessage message={errors.protein}/>
                            </View>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text>Fat: </Text>
                                    <InputGroup>
                                        <Input type={'text'} keyboardType={'numeric'} onChangeText={setFat}/>
                                        <InputRightAddon>g</InputRightAddon>
                                    </InputGroup>
                                </View>
                                <FormErrorMessage message={errors.fat}/>
                            </View>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text>Carbs: </Text>
                                    <InputGroup>
                                        <Input type={'text'} keyboardType={'numeric'} onChangeText={setCarbs}/>
                                        <InputRightAddon>g</InputRightAddon>
                                    </InputGroup>
                                </View>
                                <FormErrorMessage message={errors.carbs}/>
                            </View>
                        </VStack>
                        <View>
                        </View>
                    </View>
                    <Divider style={{marginTop: 30}}></Divider>
                    <View style={{marginTop: 30, marginBottom: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'baseline', gap: 5}}>
                            <Text style={{
                                marginBottom: 3,
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: Colors.black
                            }}>Portions</Text>
                            <Text style={{color: Colors.textGray}}>(Optional)</Text>
                        </View>
                        <Text style={{marginTop: 3, color: Colors.textGray}}>Create portions with predefined
                            amounts.</Text>
                        <FlatList
                            data={portions}
                            renderItem={({item}) => (
                                <View style={{
                                    gap: 10,
                                    marginTop: 20,
                                    shadowColor: Colors.textGray,
                                    padding: 15,
                                    shadowRadius: 10,
                                    borderRadius: 10,
                                    shadowOpacity: 0.5,
                                }}>
                                    <View>
                                        <Text>Portion</Text>
                                        <Input onChangeText={(val) => updatePortionTitle(item, val)}
                                               placeholder={'e.g. spoon, bite, piece...'}/>
                                    </View>
                                    <View>
                                        <Text>Amount</Text>
                                        <InputGroup>
                                            <Input onChangeText={(val) => updatePortionAmount(item, val)}/>
                                            <InputRightAddon>g</InputRightAddon>
                                        </InputGroup>
                                    </View>
                                </View>
                            )}
                        />
                        <Button
                            style={{marginTop: 20}}
                            onPress={() => setPortions(prev => ([...prev, {
                                    title: '',
                                    amount: '',
                                    id: Crypto.randomUUID()
                                }])
                            )}
                            modifier={'secondary'}>Add portion</Button>
                    </View>
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                    <Button modifier={'destructive'} onPress={onClose}>Cancel</Button>
                    <Button modifier={'secondary'} onPress={createItem}>Save</Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputsContainer: {
        maxWidth: 250,
    },
    footer: {
        gap: 10
    }
})