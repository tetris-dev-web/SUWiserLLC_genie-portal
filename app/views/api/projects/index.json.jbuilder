@projects.each do |project|
  json.set! project.title do
    json.partial! 'api/projects/project', project: project
  end
end
