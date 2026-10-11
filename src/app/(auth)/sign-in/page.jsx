"use client";

import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";


const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("Form Data:", data);

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: '/'
        });



        console.log("after submit", resData, error);

    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold">Sign In</h1>

                <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>

                        <InputGroup>
                            <InputGroup.Input
                                name="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                            />

                            <InputGroup.Suffix className="pe-0">
                                <Button
                                    isIconOnly
                                    type="button"
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible((prev) => !prev)}
                                >
                                    {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <Description>Enter your password to sign in.</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button type="submit">Sign In</Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignInPage;