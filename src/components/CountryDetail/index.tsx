'use client'

import { useState, useMemo } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Map, Users, Landmark, DollarSign, Languages, Award, Handshake, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { useGetCountryDetailsQuery } from "@/lib/features/countriesSlice"
import { useParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { addCooperation } from "@/lib/features/cooperationSlice"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { selectAllCooperations } from "@/lib/features/cooperationSlice"
import { useSelector } from "react-redux"
export default function CountryDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { data, isLoading, isError } = useGetCountryDetailsQuery(id)
  const cooperation = useSelector(selectAllCooperations)

  const countryDetails = useMemo(() => {
    return data?.map((country: any) => {
      return {
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital[0],
        population: country.population,
        currency: Object.keys(country.currencies)[0],
        languages: Object.values(country.languages),
        continent: country.continents[0],
        area: country.area,
        gdp: country.gini?.[2014] || 0,
        independent: country.independent,
        googleMaps: country.maps.googleMaps
      }
    })
  }, [data])

  const [showCooperationDialog, setShowCooperationDialog] = useState(false)
  const [cooperationResult, setCooperationResult] = useState<boolean | null>(null)

  const handleCooperationOffer = () => {
    if(cooperation.find((cooperation: any) => cooperation.name === countryDetails[0].name)) {
      setCooperationResult(false)
      setShowCooperationDialog(true)
      return
    }
    dispatch(addCooperation(countryDetails[0]))
    // Simulasi hasil penawaran kerja sama
    
    setCooperationResult(true)
    setShowCooperationDialog(true)
  }

  return (
    <div className="p-4">
      {countryDetails?.map((country: any) => (
        <div key={country.name}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src={country.flag} alt={`${country.name} flag`} width={80} height={53} className="rounded" />
                <CardTitle>{country.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="md:grid grid-cols-2 md:gap-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-gray-500" />
                  <span>Capital: {country.capital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Population: {country.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>Currency: {country.currency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-gray-500" />
                  <span>Languages: {country.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <span>Continent: {country.continent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-gray-500" />
                  <span>Area: {country.area.toLocaleString()} km²</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>GDP: ${country.gdp.toLocaleString()} million</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span>Independent: {country.independent ? 'Yes' : 'No'}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Map className="w-5 h-5 text-gray-500" />
                  <a
                    href={country.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCooperationOffer}>
                <Handshake className="w-5 h-5 mr-2" />
                Offer Cooperation
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}

      {/* Modal Dialog */}
      <Dialog open={showCooperationDialog} onOpenChange={setShowCooperationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cooperation Offer Result</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {cooperationResult ? (
              <div className="flex items-center gap-2 text-green-600">
                <Handshake className="w-5 h-5" />
                <span>Cooperation offer accepted! {countryDetails[0].name} has been added to your cooperation list.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>You already have an existing cooperation offer with {countryDetails?.[0].name}.</span>
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowCooperationDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}