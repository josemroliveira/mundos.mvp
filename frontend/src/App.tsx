import React, { useState, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Progress } from "./components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Calendar } from "./components/ui/calendar"
import { Input } from "./components/ui/input"
import { ScrollArea } from "./components/ui/scroll-area"
import { Textarea } from "./components/ui/textarea"
import { Lightbulb, Target, TrendingUp, Eye, GraduationCap, Globe, DollarSign, Send, Plus, History, ExternalLink } from 'lucide-react'
import { Slider } from "./components/ui/slider"
import { Switch } from "./components/ui/switch"
import { Label } from "./components/ui/label"
import { Users as UsersIcon, Search, FileText, Brain, Zap, Calendar as CalendarIcon, BellRing, Settings, HelpCircle, Link, MessageSquare } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

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
  const [progress, setProgress] = useState(33)
  const [aiAssistant, setAiAssistant] = useState(true)
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
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const positiveWords = ['growth', 'increase', 'opportunity', 'innovation'];
    const negativeWords = ['challenge', 'decline', 'problem', 'issue'];
    
    let positiveCount = 0;
    let totalCount = 0;

    researchBlocks.forEach(block => {
      const words = block.content.toLowerCase().split(' ');
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) positiveCount--;
        totalCount++;
      });
    });

    const sentiment = ((positiveCount / totalCount) + 1) / 2 * 100; // Normalize to 0-100
    setProgress(Math.round(sentiment));
  }, [researchBlocks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const newBlock = {
        id: researchBlocks.length + 1,
        content: `AI-generated insight: ${searchQuery} is a key trend in the Brazilian education sector`,
        source: "https://www.example.com/ai-generated-insight",
        comments: []
      }
      setResearchBlocks([...researchBlocks, newBlock])
      setSearchQuery("")
    }
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
      {/* Sidebar */}
      <nav className="w-64 bg-pattern border-r border-[#333] shadow-lg flex flex-col overflow-y-auto" aria-label="Main Navigation">
        <div className="p-4 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-[#D7FF00]">Knowledge Canvas</h2>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start hover:bg-[#333] transition-colors text-white">
              <UsersIcon className="mr-2 h-5 w-5 text-[#D7FF00]" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-[#333] transition-colors text-white">
              <Search className="mr-2 h-5 w-5 text-[#D7FF00]" />
              Explore
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-[#333] transition-colors text-white">
              <FileText className="mr-2 h-5 w-5 text-[#D7FF00]" />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-[#333] transition-colors text-white">
              <Brain className="mr-2 h-5 w-5 text-[#D7FF00]" />
              Brain
            </Button>
          </nav>
        </div>
        <div className="p-4 border-t border-[#333]">
          <h3 className="font-semibold mb-4 text-[#D7FF00]">Team Members</h3>
          <div className="space-y-3">
            {["Ana", "Pedro", "Carla", "Diego"].map((name, index) => (
              <div key={name} className="flex items-center">
                <Avatar className="h-8 w-8 ring-2 ring-[#D7FF00]">
                  <AvatarImage src={`https://i.pravatar.cc/32?img=${index + 1}`} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm text-white">{name}</span>
                <Badge variant="secondary" className="ml-auto text-xs bg-[#333] text-[#D7FF00]">Online</Badge>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-pattern p-4 flex items-center justify-between" role="banner">
          <h1 className="text-2xl font-bold text-[#D7FF00]">Education Sector Research Hub</h1>
          <div className="flex items-center space-x-4">
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden" aria-label="Research Tabs">
          <TabsList className="bg-pattern border-b border-[#333] px-4 justify-start" aria-label="Research Categories">
            <TabsTrigger value="research" className="data-[state=active]:bg-[#333] data-[state=active]:text-[#D7FF00]">Research</TabsTrigger>
            <TabsTrigger value="synthesize" className="data-[state=active]:bg-[#333] data-[state=active]:text-[#D7FF00]">Synthesize</TabsTrigger>
            <TabsTrigger value="recommend" className="data-[state=active]:bg-[#333] data-[state=active]:text-[#D7FF00]">Recommend</TabsTrigger>
            <TabsTrigger value="visualize" className="data-[state=active]:bg-[#333] data-[state=active]:text-[#D7FF00]">Visualize</TabsTrigger>
            <TabsTrigger value="brain" className="data-[state=active]:bg-[#333] data-[state=active]:text-[#D7FF00]">Brain</TabsTrigger>
          </TabsList>
          <div className="flex-1 p-6 overflow-y-auto">
            <TabsContent value="research" className="h-full">
              <Card className="h-full shadow-lg border-[#333] bg-[#242424]">
                <CardHeader className="bg-gradient-to-r from-[#242424] to-[#333] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5 text-[#D7FF00]" aria-hidden="true" />
                    Research Dashboard
                  </CardTitle>
                  <CardDescription className="text-gray-400">Collect and analyze data for education sector investments</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-y-auto">
                  <div className="space-y-6">
                    <form onSubmit={handleSearch} className="flex space-x-2" role="search">
                      <Input
                        type="text"
                        placeholder="Search for education trends..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-[#333] border-[#444] text-white placeholder-gray-400"
                        aria-label="Search for education trends"
                      />
                      <Button type="submit" className="bg-[#333] hover:bg-[#444] text-[#D7FF00]" aria-label="Search">
                        <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                        Search
                      </Button>
                    </form>
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
                <div className="p-6 bg-[#242424] border-t border-[#333]">
                  <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                    <Zap className="mr-2 h-4 w-4" />
                    AI Sentiment Analysis
                  </h3>
                  <div className="bg-[#333] p-3 rounded-lg text-white">
                    <div className="flex justify-between items-center mb-2">
                      <span>Positive Sentiment</span>
                      <span className="font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full bg-[#444]" />
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="synthesize" className="h-full">
              <Card className="h-full shadow-lg border-[#333] bg-[#242424] overflow-hidden flex flex-col">
                <CardHeader className="bg-gradient-to-r from-[#242424] to-[#333] text-white sticky top-0 z-10">
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
                        <Zap className="mr-2 h-4 w-4" />
                        AI Confidence Score
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                        <Slider defaultValue={[75]} max={100} step={1} className="bg-[#333]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommend" className="h-full">
              <Card className="h-full shadow-lg border-[#333] bg-[#242424]">
                <CardHeader className="bg-gradient-to-r from-[#242424] to-[#333] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-[#D7FF00]" />
                    Investment Recommendations
                  </CardTitle>
                  <CardDescription className="text-gray-400">Strategic suggestions for education sector investments</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
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
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Key Criteria
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Scalable technology with potential for rapid user acquisition",
                          "Strong focus on accessibility and affordability",
                          "Innovative approaches to STEM education"
                        ].map((approach, index) => (
                          <li key={index} className="flex items-center bg-[#333] p-2 rounded-lg text-white">
                            <span className="w-3 h-3 bg-[#D7FF00] rounded-full mr-2"></span>
                            {approach}
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
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        AI Assistant
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ai-mode"
                          checked={aiAssistant}
                          onCheckedChange={setAiAssistant}
                        />
                        <Label htmlFor="ai-mode" className="text-white">AI-powered recommendations</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="visualize" className="h-full">
              <Card className="h-full shadow-lg border-[#333] bg-[#242424]">
                <CardHeader className="bg-gradient-to-r from-[#242424] to-[#333] text-white sticky top-0 z-10">
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
                      <div className="bg-[#333] p-3 rounded-lg text-white h-64 flex items-center justify-center">
                        <p className="text-center">Interactive chart showing EdTech market growth in Brazil (2020-2025)</p>
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
            <TabsContent value="brain" className="h-full">
              <Card className="h-full shadow-lg border-[#333] bg-[#242424]">
                <CardHeader className="bg-gradient-to-r from-[#242424] to-[#333] text-white sticky top-0 z-10">
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-[#D7FF00]" />
                    AI Brain
                  </CardTitle>
                  <CardDescription className="text-gray-400">AI-powered insights and decision support</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        AI Assistant
                      </h3>
                      <div className="bg-[#333] p-3 rounded-lg text-white">
                        <div className="flex items-center space-x-2 mb-4">
                          <Switch
                            id="ai-mode"
                            checked={aiAssistant}
                            onCheckedChange={setAiAssistant}
                          />
                          <Label htmlFor="ai-mode">AI-powered insights</Label>
                        </div>
                        <div className="space-y-2">
                          <p>Ask me anything about the education sector in Brazil!</p>
                          <div className="flex space-x-2">
                            <Input placeholder="Type your question here..." className="flex-1 bg-[#242424] border-[#444] text-white placeholder-gray-400" />
                            <Button className="bg-[#D7FF00] text-[#242424] hover:bg-[#C2E600]">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        AI Insights
                      </h3>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          {[
                            "Based on current trends, AI-powered adaptive learning platforms are likely to see significant growth in the next 2-3 years.",
                            "There's an opportunity to invest in startups focusing on vocational training and upskilling programs for the Brazilian workforce.",
                            "The demand for English language learning apps is projected to increase, especially those utilizing AR/VR technologies."
                          ].map((insight, index) => (
                            <div key={index} className="bg-[#333] p-3 rounded-lg text-white">
                              <p>{insight}</p>
                              <div className="flex justify-between items-center mt-2">
                                <Badge variant="outline" className="bg-[#242424] text-[#D7FF00]">AI Generated</Badge>
                                <Button variant="ghost" size="sm" className="text-[#D7FF00] hover:text-white">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add to Research
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#D7FF00] flex items-center">
                        <History className="mr-2 h-4 w-4" />
                        Recent Queries
                      </h3>
                      <ScrollArea className="h-[150px]">
                        <ul className="space-y-2">
                          {[
                            "What are the top EdTech trends in Brazil for 2023?",
                            "How is AI being used in Brazilian classrooms?",
                            "What's the market size for online tutoring platforms in Brazil?"
                          ].map((query, index) => (
                            <li key={index} className="flex items-center bg-[#333] p-2 rounded-lg text-white">
                              <span className="w-3 h-3 bg-[#D7FF00] rounded-full mr-2"></span>
                              {query}
                              <Button variant="ghost" size="sm" className="ml-auto text-[#D7FF00] hover:text-white">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      {/* Help Button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg bg-[#D7FF00] hover:bg-[#C2E600] transition-colors duration-200"
        size="icon"
        aria-label="Get Help"
      >
        <HelpCircle className="h-6 w-6 text-[#242424]" aria-hidden="true" />
      </Button>
    </div>
  )
}