import React from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  HeaderTitle,
  Form
} from './styles';

export function SignIn() {
  const {
    control,
    handleSubmit,
    reset,
    formState
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  async function handleLogin(formData: FormData) {
  

    const data = await AsyncStorage.getItem('@passmanager:logins');
    const oldLogins = data ? (JSON.parse(data) as FormData[]) : []

    const newLoginData = {
      id: String(uuid.v4()),
      ...formData
    }

    await AsyncStorage.setItem('@passmanager:logins',
    JSON.stringify([
      ...oldLogins,
      newLoginData      
    ]))
    
    reset();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <HeaderTitle>Salve o login de algum serviço!</HeaderTitle>

        <Form>
          <Input
            title="Título"
            name="title"
            error={errors.title && errors.title.message}
            control={control}
            placeholder="Escreva o título aqui"
            autoCapitalize="sentences"
            autoCorrect
          />
          <Input
            title="Email"
            name="email"
            error={errors.email && errors.email.message}
            control={control}
            placeholder="Escreva o Email aqui"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            title="Senha"
            name="password"
            error={errors.password && errors.password.message}
            control={control}
            secureTextEntry
            placeholder="Escreva a senha aqui"
          />

          <Button
            style={{
              marginTop: RFValue(26)
            }}
            title="Salvar"
            onPress={handleSubmit(handleLogin)}
          />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  )
}