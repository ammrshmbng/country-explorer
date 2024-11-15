'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Handshake, X, Globe, Users, DollarSign, Flag } from 'lucide-react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCooperations } from '@/lib/features/cooperationSlice'

export default function CooperationAgreements() {
  const [cooperationList, setCooperationList] = useState([
    { name: "United States", flag: "/placeholder.svg?height=40&width=60", capital: "Washington, D.C.", population: 331002651, currency: "USD", continent: "North America" },
    { name: "Japan", flag: "/placeholder.svg?height=40&width=60", capital: "Tokyo", population: 126476461, currency: "JPY", continent: "Asia" },
    { name: "France", flag: "/placeholder.svg?height=40&width=60", capital: "Paris", population: 67391582, currency: "EUR", continent: "Europe" },
    { name: "Brazil", flag: "/placeholder.svg?height=40&width=60", capital: "Brasília", population: 212559417, currency: "BRL", continent: "South America" },
  ])

  const handleRemoveCooperation = (countryToRemove: any) => {
    setCooperationList(cooperationList.filter(country => country.name !== countryToRemove.name))
  }

  const cooperation = useSelector(selectAllCooperations)
  
  
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 min-h-screen">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">Cooperation Agreements</h1>
      {cooperationList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {
            cooperation.length > 0 ? 
            (
                cooperation?.map((country:any) => (
                    <Card key={country.name} className="flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2 flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Image src={country.flag} alt={`${country.name} flag`} width={40} height={27} className="rounded" />
                            <div>
                              <CardTitle className="text-lg font-semibold">{country.name}</CardTitle>
                              <p className="text-xs text-gray-500">{country.capital}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-1">
                            <Globe className="w-3 h-3 mr-1 inline-block" />
                            {country.continent}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4 px-4 flex-grow">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm">Pop: {country.population.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm">Currency: {country.currency}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Handshake className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-green-600">Active Cooperation</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className=" px-4 py-3 mt-auto">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white py-2 px-4 rounded-md text-sm" 
                          onClick={() => handleRemoveCooperation(country)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          End Cooperation
                        </Button>
                      </CardFooter>
                    </Card>
                  )) 
            )
            :
            (
                <div className=" py-12 col-span-full  ">
                    <Flag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold mb-2 text-center">No Active Cooperation Agreements</h2>
                    <p className="text-muted-foreground text-center">Start building international relationships by offering cooperation to countries.</p>
                </div>
            )
          
          }
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <Flag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700">No Active Cooperation Agreements</h2>
          <p className="text-gray-500 text-sm sm:text-base">Start building international relationships by offering cooperation to countries.</p>
        </div>
      )}
    </div>
  )
}