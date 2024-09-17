import React, { useState, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Calendar } from "./components/ui/calendar"
import { Input } from "./components/ui/input"
import { ScrollArea } from "./components/ui/scroll-area"
import { Textarea } from "./components/ui/textarea"
import { Lightbulb, Target, TrendingUp, Eye, GraduationCap, Globe, DollarSign, Send, Plus, History, ExternalLink, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react'
import { Slider } from "./components/ui/slider"
import { Users as UsersIcon, Search, FileText, Brain, Zap, Calendar as CalendarIcon, BellRing, Settings, HelpCircle, Link, MessageSquare, Grid, Globe2, Check } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu" 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResearchBlock = ({ 
  block, 
  index, 
  newComment, 
  setNewComment, 
  handleAddComment 
}: { 
  block: any; 
  index: number; 
  newComment: string; 
  setNewComment: (comment: string) => void; 
  handleAddComment: (blockId: number, type: string) => void;
}) => {
  return (
    <Draggable key={block.id} draggableId={block.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4 p-4 bg-[#333] rounded-lg shadow-md border border-[#444] space-y-2"
          role="listitem"
        >
          <div className="flex justify-between items-start">
            <p className="text-white">{block.content}</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[#D7FF00] hover:text-white">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#242424] border-[#333]" align="start" side="left">
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#D7FF00]">Comments & Insights</h4>
                  <ScrollArea className="h-[200px] w-full pr-4">
                    {block.comments.map((comment: any, index: number) => (
                      <div key={index} className="mb-4 p-2 bg-[#333] rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-white">{comment.user}</span>
                          <Badge variant={comment.type === 'question' ? 'secondary' : 'outline'} className="bg-[#444] text-[#D7FF00]">
                            {comment.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-400 mr-2">Expertise:</span>
                          {[...Array(5)].map((_, i) => (
                            <Zap key={i} className={`h-3 w-3 ${i < comment.expertise ? 'text-[#D7FF00]' : 'text-gray-600'}`} />
                          ))}
                          {comment.user === 'Ana' && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-[#444] text-[#D7FF00]">EdTech Expert</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Add your insight or comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-[#333] border-[#444] text-white placeholder-gray-400"
                    />
                    <div className="flex justify-between">
                      <Button size="sm" onClick={() => handleAddComment(block.id, 'question')} className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                        Add Question
                      </Button>
                      <Button size="sm" onClick={() => handleAddComment(block.id, 'hypothesis')} className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                        Add Hypothesis
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <Button variant="link" size="sm" asChild className="text-[#D7FF00] hover:text-white">
              <a href={block.source} target="_blank" rel="noopener noreferrer">
                <Link className="mr-1 h-3 w-3" />
                Source
              </a>
            </Button>
            <span>Drag to organize</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default function MundosResearchHub() {
  const [activeTab, setActiveTab] = useState("research")
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [newComment, setNewComment] = useState("")
  const [researchBlocks, setResearchBlocks] = useState([
    { 
      id: 1, 
      content: "EdTech market in Brazil expected to reach $3.6 billion by 2025", 
      source: "https://www.example.com/edtech-market-report",
      comments: [
        { user: "Ana", content: "This aligns with our growth projections for the sector.", expertise: 5, type: "hypothesis" },
        { user: "Pedro", content: "How does this compare to other emerging markets?", expertise: 3, type: "question" }
      ]
    },
    { 
      id: 2, 
      content: "70% of Brazilian schools plan to implement more digital learning tools in the next 12 months", 
      source: "https://www.example.com/digital-learning-survey",
      comments: []
    },
    { 
      id: 3, 
      content: "Access to quality internet remains the top barrier for EdTech adoption in rural areas", 
      source: "https://www.example.com/edtech-challenges-study",
      comments: []
    },
    { 
      id: 4, 
      content: "Rise of microlearning and upskilling platforms: With the rapidly evolving job market, there's a growing demand for short, focused learning modules that allow professionals to upskill quickly",
      source: "https://www.example.com/edtech-challenges-study",
      comments: []
    },
  ])

  const [isSetupPopoverOpen, setIsSetupPopoverOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchFilter, setSearchFilter] = useState("Memory")
  const [addedItems, setAddedItems] = useState<number[]>([])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

  const performSearch = () => {
    if (searchQuery.trim().toLowerCase() === "key trends education sector brazil") {
      setSearchResults([
        "1. **Rapid growth in EdTech adoption**: The Brazilian EdTech market is experiencing unprecedented growth, with projections indicating a *CAGR of 15.5%* from 2021 to 2026. This surge is driven by increased internet penetration, rising smartphone usage, and a growing demand for personalized learning solutions. The COVID-19 pandemic has further accelerated this trend, with over *70% of Brazilian educational institutions* reporting increased investment in digital learning tools...",
        "2. **Mobile-first learning solutions**: With *over 242 million* smartphone users in Brazil as of 2021, mobile learning has become a dominant force in the education sector. EdTech companies are increasingly focusing on developing mobile-friendly applications and responsive web designs. A recent survey showed that *85% of Brazilian students* prefer using their smartphones for educational purposes, highlighting the need for mobile-optimized content and platforms...",
        "3. **Artificial Intelligence in education**: AI-powered adaptive learning platforms are gaining traction in Brazil, with the market expected to grow by *22% annually* until 2025. These platforms use machine learning algorithms to personalize learning paths, provide real-time feedback, and optimize content delivery. Notable success stories include *Geekie*, which has partnered with over 5,000 schools nationwide, demonstrating the scalability and effectiveness of AI in education...",
        "4. **Focus on STEM education**: The Brazilian government has launched several initiatives to promote STEM education, aiming to prepare students for the digital economy. The *National Common Curricular Base (BNCC)* now includes coding and computational thinking as core skills. This shift has led to a *35% increase* in enrollment for STEM-related courses in higher education institutions over the past three years...",
        "5. **Rise of microlearning and upskilling platforms**: With the rapidly evolving job market, there's a growing demand for short, focused learning modules that allow professionals to upskill quickly. Platforms offering microlearning content have seen a *120% year-over-year growth* in user engagement. Companies like *Udemy* and *Coursera* have reported a *300% increase* in course enrollments from Brazilian users, particularly in areas such as data science, digital marketing, and project management..."
      ])
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
    setAddedItems([])
  }

  const handleAddItem = (index: number) => {
    setAddedItems(prevItems => {
      if (prevItems.includes(index)) {
        return prevItems.filter(item => item !== index)
      } else {
        return [...prevItems, index]
      }
    })
  }

  const handleAddComment = (blockId: number, type: string) => {
    if (newComment.trim()) {
      const updatedBlocks = researchBlocks.map(block => {
        if (block.id === blockId) {
          return {
            ...block,
            comments: [...block.comments, { user: "You", content: newComment, expertise: 3, type }]
          }
        }
        return block
      })
      setResearchBlocks(updatedBlocks)
      setNewComment("")
    }
  }

  const MarketGrowthChart = () => {
    const data = [
      { year: 2020, value: 1.5 },
      { year: 2021, value: 1.9 },
      { year: 2022, value: 2.4 },
      { year: 2023, value: 2.9 },
      { year: 2024, value: 3.3 },
      { year: 2025, value: 3.6 },
    ];
  
    const minValue = Math.min(...data.map(d => d.value));
    const maxValue = Math.max(...data.map(d => d.value));
  
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Y-axis */}
        <line x1="40" y1="20" x2="40" y2="180" stroke="#888" />
        <text x="10" y="20" fill="#888" fontSize="12">$3.6B</text>
        <text x="10" y="180" fill="#888" fontSize="12">$1.5B</text>
  
        {/* X-axis */}
        <line x1="40" y1="180" x2="380" y2="180" stroke="#888" />
        {data.map((d, i) => (
          <text key={i} x={40 + i * 60} y="195" fill="#888" fontSize="12" textAnchor="middle">
            {d.year}
          </text>
        ))}
  
        {/* Data points and lines */}
        <polyline
          points={data.map((d, i) => `${40 + i * 60},${180 - (d.value - minValue) / (maxValue - minValue) * 160}`).join(' ')}
          fill="none"
          stroke="#D7FF00"
          strokeWidth="2"
        />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={40 + i * 60}
            cy={180 - (d.value - minValue) / (maxValue - minValue) * 160}
            r="4"
            fill="#D7FF00"
          />
        ))}
      </svg>
    );
  };   

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(researchBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResearchBlocks(items);
  };

  return (
    <div className="flex h-screen bg-pattern text-white overflow-hidden" role="application">
      {/* Collapsible Sidebar */}
      <div 
        className={`fixed top-4 left-4 h-[calc(100%-2rem)] bg-[#111] shadow-lg transition-all duration-300 ease-in-out rounded-xl border border-[#333] ${
          isSidebarOpen ? 'w-64 z-50' : 'w-0 -translate-x-full'
        }`}
      >
        {isSidebarOpen && (
          <nav className="p-5 h-full flex flex-col" aria-label="Main Navigation">
            <h2 className="text-xl font-bold mb-7 text-[#D7FF00]">Education Sector Research Hub</h2>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start hover:bg-[#222] transition-colors text-white rounded-lg">
                <Brain className="mr-2 h-5 w-5 text-[#D7FF00]" />
                Research Memory
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-[#222] transition-colors text-white rounded-lg">
                <FileText className="mr-2 h-5 w-5 text-[#D7FF00]" />
                Projects
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-[#222] transition-colors text-white rounded-lg">
                <FileText className="mr-2 h-5 w-5 text-[#D7FF00]" />
                Documents
              </Button>
            </nav>
            <div className="mt-auto">
              <h3 className="font-semibold mb-4 text-[#D7FF00]">Team Members</h3>
              <div className="space-y-3">
                {["Ana", "Pedro", "Carla", "Diego"].map((name, index) => (
                  <div key={name} className="flex items-center">
                    <Avatar className="h-8 w-8 ring-2 ring-[#D7FF00]">
                      <AvatarImage src={`https://i.pravatar.cc/32?img=${index + 1}`} />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm text-white">{name}</span>
                    <Badge variant="secondary" className="ml-auto text-xs bg-[#222] text-[#D7FF00]">Online</Badge>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-6 left-6 z-50 bg-[#111] text-white p-2 rounded-full transition-all duration-300 border border-[#333] ${
          isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>

      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-6 left-4 z-40 bg-black text-white p-2 rounded-full transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden items-center">
        <div className="w-full max-w-7xl px-4 flex flex-col h-full">
          <header className="bg-pattern mt-8 p-4 flex items-center justify-between" role="banner">

            {/* Search Function */}
            <div className="relative mx-auto z-40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search everywhere ..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10 pr-24 py-2 w-[600px] bg-[#111] border-[#222] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D7FF00] focus:border-transparent"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {searchFilter === "Memory" ? <Brain className="mr-2 h-4 w-4 text-[#D7FF00]" /> : <Globe2 className="mr-2 h-4 w-4 text-[#D7FF00]" />}
                      {searchFilter}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] bg-[#222] border-[#333] text-white">
                    <DropdownMenuItem onClick={() => setSearchFilter("Memory")} className="focus:bg-[#333] focus:text-white">
                      <Brain className="mr-2 h-4 w-4 text-[#D7FF00]" /> Memory
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchFilter("Web")} className="focus:bg-[#333] focus:text-white">
                      <Globe2 className="mr-2 h-4 w-4 text-[#D7FF00]" /> Web
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {showSearchResults && (
                <div className="absolute left-0 right-0 w-[600px] mt-2 bg-[#111] border border-[#222] rounded-md shadow-lg">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-4">
                      {searchResults.map((result, index) => (
                        <div key={index} className="bg-[#222] p-3 rounded-lg text-white relative">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute top-1 right-1 text-[#D7FF00] hover:text-white"
                            onClick={() => handleAddItem(index)}
                          >
                            {addedItems.includes(index) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </Button>
                          <p dangerouslySetInnerHTML={{
                            __html: result.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-[#D7FF00]">$1</span>')
                                      .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
                          }} />
                        </div>
                      ))} 
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>

              <div className="flex items-center space-x-4 flex-1 justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-[#333] border-[#444] text-white">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#242424] border-[#333]" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => setDate(newDate)}
                      className="bg-[#242424] text-white"
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon" className="bg-[#333] border-[#444] text-white">
                  <BellRing className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-[#333] border-[#444] text-white">
                  <Settings className="h-4 w-4" />
                </Button>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
              </div>
          </header>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden mt-6" aria-label="Research Tabs">
            <TabsList className="bg-pattern border-b border-[#222] px-4 justify-start mb-6" aria-label="Research Categories">
              <TabsTrigger value="research" className="data-[state=active]:bg-transparent data-[state=active]:text-[#D7FF00] data-[state=active]:border-b-2 data-[state=active]:border-[#D7FF00]">
                <Search className="mr-2 h-4 w-4" />
                Research
              </TabsTrigger>
              <TabsTrigger value="synthesize" className="data-[state=active]:bg-transparent data-[state=active]:text-[#D7FF00] data-[state=active]:border-b-2 data-[state=active]:border-[#D7FF00]">
                <Zap className="mr-2 h-4 w-4" />
                Synthesize
              </TabsTrigger>
              <TabsTrigger value="visualize" className="data-[state=active]:bg-transparent data-[state=active]:text-[#D7FF00] data-[state=active]:border-b-2 data-[state=active]:border-[#D7FF00]">
                <Eye className="mr-2 h-4 w-4" />
                Visualize
              </TabsTrigger>
            </TabsList>

          {/* Research Dashboard */}    
          <div className="flex-1 overflow-hidden">
            <TabsContent value="research" className="h-full overflow-auto">
              <Card className="h-full shadow-lg border-[#222] bg-[#111] overflow-hidden flex flex-col">
                <CardHeader className="bg-gradient-to-r from-[#111] to-[#222] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5 text-[#D7FF00]" />
                    Research Dashboard
                  </CardTitle>
                  <CardDescription className="text-gray-400">Collect and analyze data for education sector investments</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-y-auto">
                  <div className="space-y-6">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="researchBlocks">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {researchBlocks.map((block, index) => (
                              <ResearchBlock 
                                key={block.id} 
                                block={block} 
                                index={index}
                                newComment={newComment}
                                setNewComment={setNewComment}
                                handleAddComment={handleAddComment}
                              />
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Synthesis Board */} 
            <TabsContent value="synthesize" className="h-full overflow-auto">
              <Card className="h-full shadow-lg border-[#222] bg-[#111] overflow-hidden flex flex-col">
                <CardHeader className="bg-gradient-to-r from-[#111] to-[#222] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-[#D7FF00]" />
                    Synthesis Board
                  </CardTitle>
                  <CardDescription className="text-gray-400">Combine insights and identify patterns in the education sector</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-y-auto">
                  <div className="space-y-6">
                  <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Target className="mr-2 h-4 w-4" />
                        Investment Focus
                      </h3>
                      <div className="flex items-center bg-[#333] p-3 rounded-lg text-white">
                        <p>Prioritize EdTech startups developing AI-powered, mobile-first learning solutions for underserved markets</p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-auto text-[#D7FF00] hover:text-white">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 bg-[#242424] border-[#333]" align="start" side="left">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-[#D7FF00]">Comments & Insights</h4>
                              <ScrollArea className="h-[200px] w-full pr-4">
                                {/* Comments would be dynamically populated here */}
                              </ScrollArea>
                              <div className="space-y-2">
                                <Textarea 
                                  placeholder="Add your insight or comment..." 
                                  className="bg-[#333] border-[#444] text-white placeholder-gray-400"
                                />
                                <div className="flex justify-between">
                                  <Button size="sm" className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                                    Add Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Key Findings
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Growing demand for personalized learning solutions",
                          "Shift towards mobile-first educational platforms",
                          "Increasing focus on STEM education in Brazil"
                        ].map((finding, index) => (
                          <li key={index} className="flex items-center bg-[#333] p-2 rounded-lg text-white">
                            <span className="w-3 h-3 bg-[#D7FF00] rounded-full mr-2"></span>
                            {finding}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="ml-auto text-[#D7FF00] hover:text-white">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 bg-[#242424] border-[#333]" align="start" side="left">
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-[#D7FF00]">Comments & Insights</h4>
                                  <ScrollArea className="h-[200px] w-full pr-4">
                                    {/* Comments would be dynamically populated here */}
                                  </ScrollArea>
                                  <div className="space-y-2">
                                    <Textarea 
                                      placeholder="Add your insight or comment..." 
                                      className="bg-[#333] border-[#444] text-white placeholder-gray-400"
                                    />
                                    <div className="flex justify-between">
                                      <Button size="sm" className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                                        Add Comment
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00]">Market Gaps</h3>
                      <div className="bg-[#333] p-3 rounded-lg text-white">
                        Lack of affordable, high-quality online education solutions for low-income areas
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00]">Potential Opportunities</h3>
                      <ul className="space-y-2">
                        {[
                          "Develop AI-driven personalized learning platforms",
                          "Create mobile-first educational apps for remote areas",
                          "Invest in startups focusing on accessible STEM education"
                        ].map((opportunity, index) => (
                          <li key={index} className="flex items-center bg-[#333] p-2 rounded-lg text-white">
                            <span className="w-3 h-3 bg-[#D7FF00] rounded-full mr-2"></span>
                            {opportunity}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="ml-auto text-[#D7FF00] hover:text-white">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 bg-[#242424] border-[#333]" align="start" side="left">
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-[#D7FF00]">Comments & Insights</h4>
                                  <ScrollArea className="h-[200px] w-full pr-4">
                                    {/* Comments would be dynamically populated here */}
                                  </ScrollArea>
                                  <div className="space-y-2">
                                    <Textarea 
                                      placeholder="Add your insight or comment..." 
                                      className="bg-[#333] border-[#444] text-white placeholder-gray-400"
                                    />
                                    <div className="flex justify-between">
                                      <Button size="sm" className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                                        Add Comment
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        Target Startups
                      </h3>
                      <div className="flex items-center bg-[#333] p-3 rounded-lg text-white">
                        <p>Early-stage companies with proven traction in Brazilian education market and potential for regional expansion</p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-auto text-[#D7FF00] hover:text-white">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 bg-[#242424] border-[#333]" align="start" side="left">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-[#D7FF00]">Comments & Insights</h4>
                              <ScrollArea className="h-[200px] w-full pr-4">
                                {/* Comments would be dynamically populated here */}
                              </ScrollArea>
                              <div className="space-y-2">
                                <Textarea 
                                  placeholder="Add your insight or comment..." 
                                  className="bg-[#333] border-[#444] text-white placeholder-gray-400"
                                />
                                <div className="flex justify-between">
                                  <Button size="sm" className="bg-[#333] hover:bg-[#444] text-[#D7FF00]">
                                    Add Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Visualization */}
            <TabsContent value="visualize" className="h-full overflow-auto">
              <Card className="h-full shadow-lg border-[#222] bg-[#111] overflow-hidden flex flex-col">
                <CardHeader className="bg-gradient-to-r from-[#111] to-[#222] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-[#D7FF00]" />
                    Data Visualization
                  </CardTitle>
                  <CardDescription className="text-gray-400">Visual representation of education sector trends and data</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        EdTech Market Growth
                      </h3>
                      <div className="bg-[#333] p-3 rounded-lg text-white h-64">
                        <MarketGrowthChart />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Education Sector Breakdown
                      </h3>
                      <div className="bg-[#333] p-3 rounded-lg text-white h-64 flex items-center justify-center">
                        <p className="text-center">Pie chart showing distribution of investments across different education segments</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Regional Adoption Heatmap
                      </h3>
                      <div className="bg-[#333] p-3 rounded-lg text-white h-64 flex items-center justify-center">
                        <p className="text-center">Heatmap of Brazil showing EdTech adoption rates by region</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Investment Trends
                        </h3>
                        <div className="bg-[#333] p-3 rounded-lg text-white h-40 flex items-center justify-center">
                          <p className="text-center">Line graph showing investment trends over time</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                          <UsersIcon className="mr-2 h-4 w-4" />
                          User Demographics
                        </h3>
                        <div className="bg-[#333] p-3 rounded-lg text-white h-40 flex items-center justify-center">
                          <p className="text-center">Bar chart showing user demographics of EdTech platforms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Overlay for background dimming */}
      {showSearchResults && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={() => setShowSearchResults(false)}
        />
      )}

      {/* Help Button */}
      <Popover open={isSetupPopoverOpen} onOpenChange={setIsSetupPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg bg-[#D7FF00] hover:bg-[#C2E600] transition-colors duration-200"
            size="icon"
            aria-label="Get Help"
          >
            <HelpCircle className="h-6 w-6 text-[#111]" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-[#111] border-[#222] p-0" side="left" align="end">
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#D7FF00]">Finish Setup</h3>
            <p className="text-sm text-gray-400">Get the most out of Cosmos by completing the following steps:</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between bg-[#222] hover:bg-[#333] text-white">
                Watch Tutorial
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between bg-[#222] hover:bg-[#333] text-white">
                Setup Profile
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between bg-[#222] hover:bg-[#333] text-white">
                Create a Cluster
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between bg-[#222] hover:bg-[#333] text-white">
                Get the Extension
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}