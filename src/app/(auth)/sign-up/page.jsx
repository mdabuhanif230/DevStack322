
"use client";

import React, { useState } from "react";

import { Eye, EyeSlash } from "@gravity-ui/icons";

import { signUp } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";

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

const SignUpPage = () => {
    const [isVisible, setIsVisible] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("Form Data:", data);

        const { data: resData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        console.log("Response:", resData);
        console.log("Error:", error);

        if (error) {
            console.error("SIGN UP ERROR:", error);

            alert(
                error.message ||
                JSON.stringify(error) ||
                "Sign up failed"
            );

            return;
        }

        console.log("Account created successfully:", resData);

        alert("Account created successfully!");
    };


    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",

        });

        console.log("Google Sign-In Response:", data);
    };
    const handleGithubSignIn = async () => {
        const rspData = await authClient.signIn.social({
            provider: "github"
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md">

                <h1 className="mb-6 text-3xl font-bold">
                    Sign Up
                </h1>

                <Form
                    className="flex w-full flex-col gap-4"
                    onSubmit={onSubmit}
                >

                    {/* Name */}
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }

                            return null;
                        }}
                    >
                        <Label>Name</Label>

                        <Input
                            placeholder="Enter your name"
                        />

                        <FieldError />
                    </TextField>


                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>

                        <Input
                            placeholder="Enter your email"
                        />

                        <FieldError />
                    </TextField>


                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
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
                                    aria-label={
                                        isVisible
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    size="sm"
                                    variant="ghost"
                                    onPress={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                >
                                    {isVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <Description>
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>

                        <FieldError />
                    </TextField>


                    {/* Buttons */}
                    <div className="flex gap-2">

                        <Button type="submit">
                            Sign Up
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                        >
                            Reset
                        </Button>

                    </div>

                </Form>

            </div>

            <p>OR</p>
            <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
            <Button onClick={handleGithubSignIn}>Sign In With GitHub</Button>

        </div>
    );
};

export default SignUpPage;
