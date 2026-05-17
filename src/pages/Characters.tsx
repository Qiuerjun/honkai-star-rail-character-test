import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, X, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { characters, paths, elements, factions } from '../data/characters';

function AvatarPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex flex-col items-center justify-center">
      <User className="w-12 h-12 text-white/30 mb-2" />
      <span className="text-white/40 text-xs text-center px-2">{name}</span>
    </div>
  );
}

export default function Characters() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPath = !selectedPath || char.path === selectedPath;
      const matchesElement = !selectedElement || char.element === selectedElement;
      const matchesFaction = !selectedFaction || char.faction === selectedFaction;
      return matchesSearch && matchesPath && matchesElement && matchesFaction;
    });
  }, [searchQuery, selectedPath, selectedElement, selectedFaction]);

  const hasActiveFilters = selectedPath || selectedElement || selectedFaction;

  const clearFilters = () => {
    setSelectedPath(null);
    setSelectedElement(null);
    setSelectedFaction(null);
  };

  return (
    <div className="relative min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('#/')}
            className="flex items-center text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">角色图鉴</h1>
          <span className="text-white/40 text-sm">({filteredCharacters.length} 个角色)</span>
        </div>

        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="搜索角色名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-white/10 border-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">筛选</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
                  {[selectedPath, selectedElement, selectedFaction].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
            >
              <div className="mb-4">
                <h3 className="text-white/70 text-sm mb-2">命途</h3>
                <div className="flex flex-wrap gap-2">
                  {paths.map((path) => (
                    <button
                      key={path}
                      onClick={() => setSelectedPath(selectedPath === path ? null : path)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedPath === path
                          ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {path}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-white/70 text-sm mb-2">属性</h3>
                <div className="flex flex-wrap gap-2">
                  {elements.map((element) => (
                    <button
                      key={element}
                      onClick={() => setSelectedElement(selectedElement === element ? null : element)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedElement === element
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {element}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white/70 text-sm mb-2">阵营</h3>
                <div className="flex flex-wrap gap-2">
                  {factions.map((faction) => (
                    <button
                      key={faction}
                      onClick={() => setSelectedFaction(selectedFaction === faction ? null : faction)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedFaction === faction
                          ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {faction}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 flex items-center gap-1 text-white/50 hover:text-white/80 text-sm transition-colors"
                >
                  <X className="w-3 h-3" />
                  清除筛选
                </button>
              )}
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCharacters.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="aspect-square overflow-hidden">
                {char.avatarUrl ? (
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-full h-full';
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                ) : (
                  <AvatarPlaceholder name={char.name} />
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  {char.rarity === 5 && (
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  )}
                  <h3 className="text-white font-bold text-sm truncate">{char.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-xs">
                    {char.path}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-xs">
                    {char.element}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">没有找到匹配的角色</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
