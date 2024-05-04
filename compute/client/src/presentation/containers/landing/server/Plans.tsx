import { Badge } from '@/presentation/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { PopularPlanType, PRICING, PricingProps } from '@/presentation/constants/pricing.constants'
import React from 'react'
import StripeButton from '../client/StripeButton'
import { auth } from '@/application/auth'
import { Check } from "lucide-react";

export const Plans:React.FC<{subs?: string}> = async ({subs = null}) => {
    const session = await auth()
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICING.map((pricing: PricingProps) => (
                <Card
                    key={pricing.title}
                    className={
                        pricing.popular === PopularPlanType.YES
                            ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                            : ""
                    }
                >
                    <CardHeader>
                        <CardTitle className="flex item-center justify-between">
                            {pricing.title}
                            {pricing.popular === PopularPlanType.YES ? (
                                <Badge
                                    variant="secondary"
                                    className="text-sm text-primary"
                                >
                                    Más popular
                                </Badge>
                            ) : null}
                        </CardTitle>
                        <div>
                            <span className="text-3xl font-bold">${pricing.price}</span>
                            <span className="text-muted-foreground"> /dispositivo</span>
                        </div>

                        <CardDescription>{pricing.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {session &&
                            <StripeButton
                                price={pricing.priceId}
                                priceType={pricing.priceType}
                                description={subs === pricing.priceId ? 'Plan actual' : pricing.buttonText}
                                userId={session?.user?.id || ''}
                                isDisabledProp={subs === pricing.priceId}
                            />
                        }
                    </CardContent>

                    <hr className="w-4/5 m-auto mb-4" />

                    <CardFooter className="flex">
                        <div className="space-y-4">
                            {pricing.benefitList.map((benefit: string) => (
                                <span
                                    key={benefit}
                                    className="flex"
                                >
                                    <Check className="text-green-500" />{" "}
                                    <h3 className="ml-2">{benefit}</h3>
                                </span>
                            ))}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

