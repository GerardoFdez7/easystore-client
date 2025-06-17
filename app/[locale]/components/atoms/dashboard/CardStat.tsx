import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@shadcn/ui/card"
import { Badge } from "@shadcn/ui/badge"

type CardStatProps = {
  description: string
  amount: string
  trend?: string
  icon?: React.ReactNode
  footerText?: string
  footerSubtext?: string
}

export default function CardStat({
  description,
  amount,
  trend,
  icon,
  footerText,
  footerSubtext,
}: CardStatProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {amount}
        </CardTitle>
        {trend && icon && (
          <CardAction>
            <Badge variant="outline" className="gap-1.5">
              {icon}
              {trend}
            </Badge>
          </CardAction>
        )}
      </CardHeader>

      {(footerText || footerSubtext) && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {footerText && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              {footerText}
              {icon && <span className="size-4">{icon}</span>}
            </div>
          )}
          {footerSubtext && (
            <div className="text-muted-foreground">{footerSubtext}</div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
